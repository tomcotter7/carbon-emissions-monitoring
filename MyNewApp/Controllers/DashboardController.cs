using IntelligentPlant.IndustrialAppStore.Authentication;
using IntelligentPlant.IndustrialAppStore.Client;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using IntelligentPlant.DataCore.Client.Queries;
using IntelligentPlant.DataCore.Client.Model;

namespace MyNewApp.Controllers
{
    
    /**
     * Author : Thomas Cotter
     * 
     * Reason : This Controller handles any requests on the Dashboard.cshtml 
     *          page. I believe we can use this to handle any calculations 
     *          rather than doing it in javascript.
     */

    [Route("Home/api/[controller]")]
    [ApiController]

    public class DashboardController : ControllerBase
    {


        const double poundsTokg = 0.45359237;
        const double kgToTonnes = 0.001;
        const double gasToC02 = 2.656159;
        const double dieselToC02 = 3.2;


        [HttpGet]
        [Route("FuelUsage")]

        /**
         * Author: Thomas Cotter
         * About: this functions gets the total fuel usage every day over 7 days
         */

        public async Task<IActionResult> FuelUsage(
            [FromServices] IndustrialAppStoreHttpClient iasClient, int points,
            [FromQuery] string[] tagNames, string dataSourceName)
        {

            WeekData wd = new WeekData();
            DateTime aWeekAgo = DateTime.Now;
            aWeekAgo = aWeekAgo.AddDays(-7);

            List<DateTime> dow = new List<DateTime>();
            List<IActionResult> fuelValues = new List<IActionResult>();

            for (int i = 1; i <= 7; i++)
            {
                DateTime temp = aWeekAgo.AddDays(1);
                var iar = await FuelUsageForTimePeriod(iasClient, points, tagNames, dataSourceName, aWeekAgo, temp);
                dow.Add(temp);
                fuelValues.Add(iar);
                aWeekAgo = temp;
                
            }

            wd.dow = dow;
            wd.iar = fuelValues;

            return Ok(wd);

        }

        /**
         * Author: Thomas Cotter
         * About: this functions gets the fuel usage over a single time period
         */

        public async Task<IActionResult> FuelUsageForTimePeriod(
            [FromServices] IndustrialAppStoreHttpClient iasClient, int points,
            [FromQuery] string[] tagNames, string dataSourceName,
            DateTime startTime, DateTime endTime) 
        {

            var request = new ReadPlotTagValuesRequest()
            {

                StartTime = startTime,
                EndTime = endTime,

                /*
                 * Tags has to be defined as a dictionary, but since 
                 * C# dictionaries and javascript dictionaries 
                 * are very different, we have to define the tagNames
                 * as a seperate array, then make the dictionary in here.
                 */
                Tags = new Dictionary<string, string[]>() {
                    {dataSourceName, tagNames}
                },
                Intervals = points
            };

            var data = await iasClient.DataSources.ReadPlotTagValuesAsync(
                request, Request.HttpContext);

            HistoricalTagValues JBGas = data[dataSourceName][tagNames[0]];
            HistoricalTagValues JBDiesel = data[dataSourceName][tagNames[1]];
            HistoricalTagValues SMGas = data[dataSourceName][tagNames[2]];
            HistoricalTagValues SMDiesel = data[dataSourceName][tagNames[3]];

            // diesel rate is measure in lb / s and gas is measured in kg / hr

            double timeUsingGasJB = getTimeOnline(JBGas, false);
            double gasUseJB = getOnlineValuesAvg(JBGas, false);

            double totalGasUseJB = gasUseJB * timeUsingGasJB;
            totalGasUseJB = totalGasUseJB * kgToTonnes;

            double timeUsingDieselJB = getTimeOnline(JBDiesel, false);
            double dieselUseJB = getOnlineValuesAvg(JBDiesel, false);

            double totalDieselUseJB = dieselUseJB * (timeUsingDieselJB * 3600);
            totalDieselUseJB = totalDieselUseJB * poundsTokg;
            totalDieselUseJB = totalDieselUseJB * kgToTonnes;


            double timeUsingGasSM = getTimeOnline(SMGas, false);
            double gasUseSM = getOnlineValuesAvg(SMGas, false);

            double totalGasUseSM = gasUseSM * timeUsingGasSM;
            totalGasUseSM = totalGasUseSM * kgToTonnes;

            
            double dieselUseSM = getOnlineValuesAvg(SMDiesel, false);
            /// this is in m^3
            dieselUseSM = (dieselUseSM * 5.3) + 25;

            dieselUseSM = dieselUseSM * 854;

            dieselUseSM = dieselUseSM * kgToTonnes;

            double totalGas = totalGasUseJB + totalGasUseSM;
            double totalDiesel = totalDieselUseJB + dieselUseSM;

            List<double> finalData = new List<double>();
            finalData.Add(totalGas);
            finalData.Add(totalDiesel);
            return Ok(finalData);
        }


        [HttpGet]
        [Route("DashboardValues")]

        /*
         * Author: Thomas Cotter
         * About: this function returns a array of plottable values for a single tag that the dashboard can use to generate a graph. It is returns the total time the machine spent online in this time period
         */

        public async Task<IActionResult> GetDashboardValues(
            [FromServices] IndustrialAppStoreHttpClient iasClient, int points,
            [FromQuery] string[] tagNames, string dataSourceName,
            DateTime startTime, DateTime endTime)
        {
            

            var request = new ReadPlotTagValuesRequest()
            { 

                StartTime = startTime,
                EndTime = endTime,

                /*
                 * Tags has to be defined as a dictionary, but since 
                 * C# dictionaries and javascript dictionaries 
                 * are very different, we have to define the tagNames
                 * as a seperate array, then make the dictionary in here.
                 */
                Tags = new Dictionary<string, string[]>() {
                    {dataSourceName, tagNames}
                },
                Intervals = points
            };


            var plotTags = await iasClient.DataSources.ReadPlotTagValuesAsync(
                request, Request.HttpContext);

            HistoricalTagValues tagValues = plotTags[dataSourceName]
                [tagNames[0]];

            double timeOnline = getTimeOnline(tagValues, true);

            DashboardDataObject ddo = new DashboardDataObject();
            ddo.tagValues = tagValues.Values;
            ddo.timeOnline = timeOnline;

            
      
            return Ok(ddo);
        }

        /**
         * Author: Thomas Cotter
         * 
         * Reason: This class allows the program to pass both the array of 
         *         values and the time online back to the javascript so the 
         *         javascript does less work
         */
        public class DashboardDataObject
        {
            public IEnumerable<TagValue> tagValues { get; set; }
            public double timeOnline { get; set; }
        }

        /**
         * Author: Thomas Cotter
         * 
         * Reason: Object to allow me to pass strings through Ok()
         */
        public class stringObject
        {
            public string color { get; set; }
        }

        /**
         * Author: Thomas Cotter
         * 
         * Date: 01/04/21
         * 
         * Reason: works out the average value from the tags passed in for the 
         *         last week and returns red if no data, orange if most recent 
         *         data is more than a 15% difference to the weeks average and
         *         green otherwise.
         */
        [HttpGet]
        [Route("WeeksAverage")]

        public async Task<IActionResult> GetAverageValuesFromAWeek(
            [FromServices] IndustrialAppStoreHttpClient iasClient, int points,
            [FromQuery] string[] tagNames, string dataSourceName,
            DateTime startTime, DateTime endTime)
        {

            var request = new ReadPlotTagValuesRequest()
            {
                StartTime = startTime,
                EndTime = endTime,
                Tags = new Dictionary<string, string[]>()
                {
                    {dataSourceName, tagNames}
                },
                Intervals = points
            };

            var tagData = await iasClient.DataSources.ReadPlotTagValuesAsync(
                request, Request.HttpContext);
            HistoricalTagValues values = tagData[dataSourceName][tagNames[0]];

            List<double> numericalValues = new List<double>();

            foreach (TagValue tv in values.Values)
            {
                if (tv.NumericValue.ToString() != "NaN") {
                    numericalValues.Add(tv.NumericValue);
                }
            }

            double average = 0;

            if (numericalValues.Count > 0)
            {
                average = numericalValues.Average();

            } else
            {
                stringObject grey = new stringObject();
                grey.color = "grey";
                return Ok(grey);
            }

            List<double> mostRecentValues = new List<double>();
            for (int i = numericalValues.Count - 15; i < 
                numericalValues.Count - 2; i++)
            {
                mostRecentValues.Add(numericalValues[i]);
            }

            double mostRecentAverage = 0;

            if (mostRecentValues.Count > 0)
            {
                mostRecentAverage = mostRecentValues.Average();
            }

            if (mostRecentAverage > (average * 1.15) || mostRecentAverage < 
                (average * 0.85))
            {
                stringObject yellow = new stringObject();
                yellow.color = "yellow";
                return Ok(yellow);
            } else
            {
                stringObject green = new stringObject();
                green.color = "green";
                return Ok(green);
            }

        }

        [HttpGet]
        [Route("TurbineEfficiency")]

        /**
         * Author: Thomas Cotter
         * 
         * About: Works out the efficiency of both turbins in MW/kg.
         * 
         * TODO: change to average efficiency per day rather than per week?.
         */
        public async Task<IActionResult> TurbineEfficiency(
            [FromServices] IndustrialAppStoreHttpClient iasClient, int points,
            [FromQuery] string[] tagNames, string dataSourceName,
            DateTime startTime, DateTime endTime)
        {

            var request = new ReadPlotTagValuesRequest()
            {
                StartTime = startTime,
                EndTime = endTime,
                Tags = new Dictionary<string, string[]>()
                {
                    {dataSourceName, tagNames}
                },
                Intervals = points
            };

            var plotTags = await iasClient.DataSources.ReadPlotTagValuesAsync(
                request, Request.HttpContext);

            HistoricalTagValues JBLoad = plotTags[dataSourceName][tagNames[0]];
            HistoricalTagValues JBGasFlowRate = plotTags[dataSourceName]
                [tagNames[2]];
            HistoricalTagValues JBDieselFlowRate = plotTags[dataSourceName]
                [tagNames[3]];

            HistoricalTagValues SMLoad = plotTags[dataSourceName][tagNames[4]];
            HistoricalTagValues SMGasFlowRate = plotTags[dataSourceName]
                [tagNames[6]];

            double totalTimeOnlineJB = getTimeOnline(JBLoad, false);

            // returns in MW 
            double averagePowerJB = getOnlineValuesAvg(JBLoad, false);

            double totalTimeUsingGasJB = getTimeOnline(JBGasFlowRate, 
                false);
            double totalTimeUsingDieselJB = getTimeOnline(JBDieselFlowRate, 
                false);

            
            double avgGasRateJB = 0;
            double avgDieselRateJB = 0;

            if (totalTimeUsingGasJB > 0) { avgGasRateJB = 
                    getOnlineValuesAvg(JBGasFlowRate, false); }
            if (totalTimeUsingDieselJB > 0) { avgDieselRateJB = 
                    getOnlineValuesAvg(JBDieselFlowRate, false); }

            // diesel rate is measure in lb/s and gas is measured in kg/hr -
            // for JB -> might be different for other turbines - need to keep
            // this in mind.

            // total gas use in kg
            double totalGasUseJB = avgGasRateJB * totalTimeUsingGasJB;
            // total diesel use in pounds.
            double totalDieselUseJB = avgDieselRateJB * (
                totalTimeUsingDieselJB * 3600);
            // convert to kg
            totalDieselUseJB = totalDieselUseJB * poundsTokg;

            double totalEnergyJBDiesel = averagePowerJB * 
                totalTimeUsingDieselJB;
            
            double totalEnergyJBGas = averagePowerJB * totalTimeUsingGasJB;

            double totalTimeOnlineSM = getTimeOnline(SMLoad, false);

            // returns in MW
            double averagePowerSM = getOnlineValuesAvg(SMLoad, false);
            

            double totalTimeUsingGasSM = getTimeOnline(SMGasFlowRate, false);

            double avgGasRateSM = 0;

            // this equation is from the help sheet -
            // not very accurate but it will do?
            double avgDieselRateSM = 0;


            if (averagePowerSM > 0) { avgDieselRateSM = 
                    (averagePowerSM * 5.3) + 25; }

            if (totalTimeUsingGasSM > 0) 
            { avgGasRateSM = getOnlineValuesAvg(SMGasFlowRate, false); }

            // in kg
            double totalGasUseSM = avgGasRateSM * totalTimeUsingGasSM;

            // in kg
            double totalDieselUseSM = avgDieselRateSM * 854;

            double totalEnergySM = averagePowerSM * totalTimeOnlineSM;
            
            double totalEnergySMFromGas = averagePowerSM * totalTimeUsingGasSM;
            double totalEnergySMFromDiesel = totalEnergySM - 
                totalEnergySMFromGas;

            // MW / kg of fuel

            
            double EfficiencyJBGas = totalEnergyJBGas / totalGasUseJB;

            
            double EfficiencyJBDiesel = totalEnergyJBDiesel / totalDieselUseJB;

            double EfficiencySMDiesel = totalEnergySMFromDiesel / 
                totalDieselUseSM;
            double EfficiencySMGas = totalEnergySMFromGas / totalGasUseSM;

            List<double> data = new List<double>();
            data.Add(EfficiencyJBGas);
            data.Add(EfficiencySMGas);
            data.Add(EfficiencyJBDiesel);
            data.Add(EfficiencySMDiesel);

            return Ok(data);
        }

        class WeekData
        {
            public List<DateTime> dow { get; set; }
            public List<IActionResult> iar { get; set; }

        }

        /**
         * Author: Thomas Cotter
         * 
         * Date:   09/04/21
         * 
         * About:  Will call GetTurbineData() 7 times in order to get 
         *         data for the week.
         */
        [HttpGet]
        [Route("EntirePlantC02Data")]

        public async Task<IActionResult> GetEntirePlantData (
            [FromServices] IndustrialAppStoreHttpClient iasClient, int points,
            [FromQuery] string[] tagNames, string dataSourceName)
        {
            WeekData wd = new WeekData();
            DateTime aWeekAgo = DateTime.Now;
            aWeekAgo = aWeekAgo.AddDays(-7);

            List<IActionResult> c02Vales = new List<IActionResult>();
            List<DateTime> dow = new List<DateTime>();

            for (int i = 1; i <= 7; i++)
            {
                DateTime temp = aWeekAgo.AddDays(1);
                dow.Add(temp);
                var actionResult = 
                    await GetTurbineData(iasClient, points, tagNames,
                    dataSourceName, aWeekAgo, temp);
                aWeekAgo = temp;
                c02Vales.Add(actionResult);
            }

            wd.dow = dow;
            wd.iar = c02Vales;

            return Ok(wd);

        }

        /**
         * Author : Thomas Cotter
         * 
         * Date: 28/02/21
         * 
         * Reason : This function will handle any data that the dashboard 
         *          needs about the turbines that produce the power for the 
         *          plant.
         */
        [HttpGet]
        [Route("DashboardTurbineValues")]

        public async Task<IActionResult> GetTurbineData(
            [FromServices] IndustrialAppStoreHttpClient iasClient, int points,
            [FromQuery] string[] tagNames, string dataSourceName,
            DateTime startTime, DateTime endTime)
        {

            var request = new ReadPlotTagValuesRequest()
            {
                StartTime = startTime,
                EndTime = endTime,
                Tags = new Dictionary<string, string[]>()
                {
                    {dataSourceName, tagNames}
                },
                Intervals = points
            };

            var plotTags = await iasClient.DataSources.ReadPlotTagValuesAsync(
                request, Request.HttpContext);

            // The reason I can do this is because the tags we
            // need are hardcoded due to limits of the Ithaca dataset.
            HistoricalTagValues JBLoad = plotTags[dataSourceName][tagNames[0]];
            HistoricalTagValues JBGasFlowRate = plotTags[dataSourceName]
                [tagNames[2]];
            HistoricalTagValues JBDieselFlowRate = plotTags[dataSourceName]
                [tagNames[3]];

            HistoricalTagValues SMLoad = plotTags[dataSourceName][tagNames[4]];
            HistoricalTagValues SMGasFlowRate = plotTags[dataSourceName]
                [tagNames[6]];

            double totalTimeOnlineJB = getTimeOnline(JBLoad, false);

            // returns in MW so we need to convert it to kW
            double averagePowerJB = getOnlineValuesAvg(JBLoad, false) * 1000;
            // the average power consumption from the times 
            // it was on * the total time it was on for in the last 24 hours.
            double totalEnergyJB = averagePowerJB * totalTimeOnlineJB;

            // We need to calculate the amount of fuel used to produce this
            // much energy.

            double totalTimeUsingGasJB = getTimeOnline(JBGasFlowRate, false);
            double totalTimeUsingDieselJB = getTimeOnline(JBDieselFlowRate, 
                false);

            double avgGasRateJB = 0;
            double avgDieselRateJB = 0;

            if (totalTimeUsingGasJB > 0) { avgGasRateJB = getOnlineValuesAvg(
                JBGasFlowRate, false); }
            if (totalTimeUsingDieselJB > 0) { avgDieselRateJB = 
                    getOnlineValuesAvg(JBDieselFlowRate, false); }

            // diesel rate is measure in lb/s and gas is measured in kg/hr -
            // for JB -> might be different for other turbines - need to keep
            // this in mind.

            // total gas use in kg
            double totalGasUseJB = avgGasRateJB * totalTimeUsingGasJB;
            // convert to tonnes
            totalGasUseJB = totalGasUseJB * kgToTonnes;
            // total diesel use in pounds.
            double totalDieselUseJB = avgDieselRateJB * (
                totalTimeUsingDieselJB * 3600);
            // convert to kg
            totalDieselUseJB = totalDieselUseJB * poundsTokg;
            //convert to tonnes
            totalDieselUseJB = totalDieselUseJB * kgToTonnes;

            double totalTimeOnlineSM = getTimeOnline(SMLoad, false);
            
            // returns in MW so need to convert to kW
            double averagePowerSM = getOnlineValuesAvg(SMLoad, false) * 1000;
            double totalEnergySM = averagePowerSM * totalTimeOnlineSM;

            double totalTimeUsingGasSM = getTimeOnline(SMGasFlowRate, false);

            double avgGasRateSM = 0;

            // this equation is from the help sheet -
            // not very accurate but it will do?
            double avgDieselRateSM = 0;


            if (averagePowerSM > 0) { avgDieselRateSM = ((averagePowerSM / 1000) * 5.3) + 25; }

            if (totalTimeUsingGasSM > 0) { avgGasRateSM = getOnlineValuesAvg(
                SMGasFlowRate, false); }
           
            // in kg
            double totalGasUseSM = avgGasRateSM * totalTimeUsingGasSM;

            // in kg
            double totalDieselUseSM = avgDieselRateSM * 854;
            // in tonnes
            totalGasUseSM = totalGasUseSM * kgToTonnes;
            totalDieselUseSM = totalDieselUseSM * kgToTonnes;

            double C02Burnt = (totalGasUseJB * gasToC02) + (totalDieselUseJB * dieselToC02) + (totalGasUseSM * gasToC02) + (totalDieselUseSM * dieselToC02);
            double totalCostInEuros = C02Burnt * 25;

            List<double> returnValues = new List<double>();
            returnValues.Add(totalEnergyJB + totalEnergySM);
            returnValues.Add(C02Burnt);
            returnValues.Add(totalCostInEuros);

            return Ok(returnValues);

        }

        /**
         * Author : Thomas Cotter
         * 
         * Date: 01/03/21
         * 
         * About: returns the avg values of when the machine was online.
         */
        private double getOnlineValuesAvg(HistoricalTagValues loadValues, 
            bool debug)
        {
            List<double> consumption = new List<double>();

            foreach (TagValue tv in loadValues.Values)
            {

                if (tv.NumericValue.ToString() != "NaN" && 
                    tv.NumericValue > 0 && tv.Status == TagValueStatus.Good)
                {

                    if (debug) { Trace.WriteLine(tv); }

                    double formattedValue = convertUnit(tv.NumericValue, 
                        tv.Unit);
                    consumption.Add(formattedValue);
                }
            }

            if (consumption.Count > 0) {
                if (debug) { Trace.WriteLine(""+consumption.Average()); }
                return consumption.Average(); 
            } else
            {
                return 0;
            }
        }

        private double convertUnit(double value, string unit)
        {
            // if any units come in weird formats they will be converted into
            // what the main function thinks they will be in order to convert
            // them into tonnes.
            if (unit == "kg/hr")
            {
                return value;
            } else if (unit == "kg/day")
            {
                return (1 / 24) * value;
            } else
            {
                // this will be used for MMscf soon.
                return value;
            }
        }

        /**
         * Author: Thomas Cotter
         * Date: 01/03/21
         * About: Returns how long a machine was online for
         */

        private double getTimeOnline(HistoricalTagValues loadValues, 
            bool debug)
        {

            // 0 = off, 1 = on
            int currentState = 0;
            TimeSpan totalTime = TimeSpan.Zero;
            List<DateTime> onTimes = new List<DateTime>();
            DateTime lv = new DateTime();

            foreach (TagValue tv in loadValues.Values)
            {

                

                if (tv.NumericValue > 0 && tv.Status == TagValueStatus.Good)
                {
                    // if machine turns on
                    if (currentState == 0)
                    {
                        onTimes.Add(tv.UtcSampleTime);
                        currentState = 1;
                    }
                } else if (tv.NumericValue <= 0 && tv.Status == 
                    TagValueStatus.Good) {
                    // if machine turns off
                    if (currentState == 1) {
                        onTimes.Add(tv.UtcSampleTime);
                        currentState = 0;
                    }
                }

                lv = tv.UtcSampleTime;
            }

            if (debug) { 
                foreach (DateTime dt in onTimes)
                {
                    Trace.WriteLine(dt);
                }
            }

            if ((onTimes.Count % 2) != 0)
            {
                onTimes.Add(lv);
            }

            // if machine came on work out time online - else return 0.
            if (onTimes.Count > 1)
            {


                for (int i = 0; i < onTimes.Count; i += 2)
                {
                    
                    if (debug) {
                        Trace.WriteLine(onTimes[i + 1]);
                        Trace.WriteLine(onTimes[i]);
                    }

                    TimeSpan timeOnline = onTimes[i + 1] - onTimes[i];
                    if (debug) { Trace.WriteLine(timeOnline); }
                    totalTime += timeOnline;
                }
                return totalTime.TotalHours;
            } else
            {
                return 0;
            }
        }

    }
}
