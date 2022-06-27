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
using System.Text;
using System.IO;

using SampleRegression.Model;

namespace MyNewApp.Controllers
{


    [Route("Home/api/[controller]")]
    [ApiController]

    public class InsightsController : ControllerBase
    {
        [HttpPost]
        [Route("RegressionAverage")]
        public ActionResult RegressionAverage([FromQuery] string[] sDateTimes)
        {
            string results = "";

            for (int i = 0; i < sDateTimes.Length; i++)
            {
                var model = new ModelInput() { Time = sDateTimes[i] };
                var prediction = ConsumeModel.Predict(model);

                results += prediction.Score.ToString() + ", ";
            }

            JsonResult finalResult = new JsonResult(results);
            return finalResult;
        }
        /**
         * Author: Jacques
         * Modified by Housu
         * Date: 02/05/21
         * About: A function that obtain the prediction data.
         * Output: A string array with the time and value one by one. 
         *         For example: {month1,value1,month2,value2.....}
         */

        [HttpPost]
        [Route("Index")]

        public ActionResult Index()
        {
            // define the time and predict data
            int MONTH_INDEX = 24;
            string[] predictData = new string[MONTH_INDEX];
            string[] dayResult = new string[MONTH_INDEX];
            DateTime start = DateTime.Now;
            DateTime next = start;
            float value = 0;
            string temp = "";

            // calcualte the prediction value each month
            for (int i = 0; i < MONTH_INDEX; i += 2)
            {
                // just care about the d/m/y, hours are not matter
                temp = String.Format("{0: dd/MM/yyyy}", start);
                ModelInput sampleData = new ModelInput();
                sampleData.Time = temp;
                var predictionResult = ConsumeModel.Predict(sampleData);

                dayResult[i] = temp;
                start = start.AddMonths(1);
                next = start;

                // add the value of each day, then get the monthly data
                for (int j = 0; j < 30; j++)
                {
                    value += predictionResult.Score;
                    next = next.AddDays(1);
                    temp = String.Format("{0: dd/MM/yyyy}", next);
                    sampleData.Time = temp;
                    predictionResult = ConsumeModel.Predict(sampleData);
                }

                dayResult[i + 1] = Convert.ToString(value);
                value = 0;
            }

            predictData = dayResult;
            JsonResult finalResult = new JsonResult(predictData);                                                            
            return finalResult;
        }

        [HttpGet]
        // could use the route to define different functions that we want
        // to do with the data.
        [Route("InsightsValues")]

        public async Task<IActionResult> GetInsightsValues(
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

            // This is basically just returning stuff.
            var plotTags = await iasClient.DataSources.ReadPlotTagValuesAsync(
                request, Request.HttpContext);

            return Ok(plotTags);
        }

        public class TwoLists {

            public List<double> l1 { get; set; }
            public List<double> l2 { get; set; }

        }
           

        
        /**
         * Author: Thomas Cotter
         * Date: 27/04/21
         * About: A function that calculates the current efficiency of n machines over a time period t.
         */

        [HttpGet]
        [Route("Throughput")]

        public async Task<IActionResult> ThroughputOfMachines (
            [FromServices] IndustrialAppStoreHttpClient iasClient, int points,
            [FromQuery] string[] tagNames, string dataSourceName, DateTime startTime, DateTime endTime)
        {

            // do for just water pumps first
            // we can get an average of m^3 / hr every hour, so that would give us m^3.
            // then get energy usage per hour, so could return m^3 / MW.

            var request = new ReadPlotTagValuesRequest()
            {
                StartTime = startTime,
                EndTime = endTime,
                Tags = new Dictionary<string, string[]>() {
                    {dataSourceName, tagNames}
                },
                Intervals = points

            };

            var data = await iasClient.DataSources.ReadPlotTagValuesAsync(request, Request.HttpContext);


            int numberOfMachines = tagNames.Length / 2;

            

            List<double> totalThroughput = new List<double>();

            
         

            List<double> averageFLCs = new List<double>();

            // average FLC%
            for (int j = 0; j < numberOfMachines; j++)
            {
                HistoricalTagValues machineData = data[dataSourceName][tagNames[j]];
                double averageFLC = getOnlineValuesAvg(machineData, false);
                double timeOnline = getTimeOnline(machineData, false);
                averageFLCs.Add(averageFLC * timeOnline);
            }

            // average m^3
            for (int i = numberOfMachines; i < tagNames.Length; i++)
            {
                // for each machine calculate average of of m^3 / hour over day and times by 24 to get total m^3 over the day
                HistoricalTagValues machineData = data[dataSourceName][tagNames[i]];
                double timeOnline = getTimeOnline(machineData, false);
                double averageThroughput = getOnlineValuesAvg(machineData, false);
                totalThroughput.Add(timeOnline * averageThroughput);

            }

            TwoLists returnData = new TwoLists();
            returnData.l1 = totalThroughput;
            returnData.l2 = averageFLCs;


            return Ok(returnData);

        }


        // TODO: let this class extend another one with all these grouped classes.


        /**
         * Author : Thomas Cotter
         * Date: 01/03/21
         * About: returns the avg values of when the machine was online.
         */
        private double getOnlineValuesAvg(HistoricalTagValues loadValues,
            bool debug)
        {
            List<double> consumption = new List<double>();

            foreach (TagValue tv in loadValues.Values)
            {

                if(debug) { Trace.WriteLine(tv); }

                if (tv.NumericValue.ToString() != "NaN" && tv.NumericValue > 0 && tv.Status == TagValueStatus.Good)
                {

                    if (debug) { Trace.WriteLine(tv); }

                    double formattedValue = convertUnit(tv.NumericValue,
                        tv.Unit);
                    consumption.Add(formattedValue);
                }
            }

            if (consumption.Count > 0)
            {
                if (debug) { Trace.WriteLine("" + consumption.Average()); }
                return consumption.Average();
            }
            else
            {
                return 0;
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
                }
                else if (tv.NumericValue <= 0 && tv.Status == TagValueStatus.Good)
                {
                    // if machine turns off
                    if (currentState == 1)
                    {
                        onTimes.Add(tv.UtcSampleTime);
                        currentState = 0;
                    }
                }

                lv = tv.UtcSampleTime;
            }

            if (debug)
            {
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

                    if (debug)
                    {
                        Trace.WriteLine(onTimes[i + 1]);
                        Trace.WriteLine(onTimes[i]);
                    }

                    TimeSpan timeOnline = onTimes[i + 1] - onTimes[i];
                    if (debug) { Trace.WriteLine(timeOnline); }
                    totalTime += timeOnline;
                }
                return totalTime.TotalHours;
            }
            else
            {
                return 0;
            }
        }


    //TO GET THE AVERAGE EMISSIONS

    [HttpGet]
        [Route("AverageEmissions")]

        //MAKES A REQUEST FOR THE AVERAGE DATA

        public async Task<IActionResult> AverageEmissionData(
           [FromServices] IndustrialAppStoreHttpClient iasClient, int points,
           [FromQuery] string[] tagNames, string dataSourceName,
           DateTime startTime, DateTime endTime)
        {

            TimeSpan difference = endTime.Subtract(startTime);
            int HOURS = (int) difference.TotalHours;

           


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

            // tagNames[0] will always be the load value - in this case it
            // will be john brown.
            HistoricalTagValues JBLoad = plotTags[dataSourceName][tagNames[0]];
            HistoricalTagValues JBGasFlowRate = plotTags[dataSourceName]
                [tagNames[2]];
            HistoricalTagValues JBDieselFlowRate = plotTags[dataSourceName]
                [tagNames[3]];

            HistoricalTagValues SMLoad = plotTags[dataSourceName][tagNames[4]];
            HistoricalTagValues SMGasFlowRate = plotTags[dataSourceName]
                [tagNames[6]];

            HistoricalTagValues waterPumpA = plotTags[dataSourceName]
                [tagNames[7]];
            HistoricalTagValues waterPumpB = plotTags[dataSourceName]
                [tagNames[8]];
            HistoricalTagValues waterPumpC = plotTags[dataSourceName]
                [tagNames[9]];
            HistoricalTagValues waterPumpD = plotTags[dataSourceName]
                [tagNames[10]];
            HistoricalTagValues waterPumpE = plotTags[dataSourceName]
                [tagNames[11]];

            //FOR NOW 24 HOURS IS USED FOR EVERYTHING TO MAKE SURE IT WORKS

            //GETTING LISTS OF VALUES
            //List<double> returnValues = new List<double>();
            List<double> JBLoadValues = valuesOfATag(JBLoad);
            List<double> JBGasFlowRateValues = valuesOfATag(JBGasFlowRate);
            List<double> JBDieselFlowRateValues = valuesOfATag(
                JBDieselFlowRate);

            List<double> SMLoadValues = valuesOfATag(SMLoad);
            List<double> SMLoadGasFlowRate = valuesOfATag(SMGasFlowRate);

            List<double> waterPumpAValues = valuesOfATag(waterPumpA);
            List<double> waterPumpBValues = valuesOfATag(waterPumpB);
            List<double> waterPumpCValues = valuesOfATag(waterPumpC);
            List<double> waterPumpDValues = valuesOfATag(waterPumpD);
            List<double> waterPumpEValues = valuesOfATag(waterPumpE);


            //GETTING THE TONNES OF GAS PER HOUR - this returns a list of
            //values for the tonnes of gas per hour in the JB Frame
            List<double> EmissionsFromGas = new List<double>();
            foreach (double value in JBGasFlowRateValues)
            {
                double val = value / 1000;
                //value = value / 1000;
                EmissionsFromGas.Add((val * 2.656159));
            }
            
            


            int numberOfValuesRecordedForEmissionsFromGas = 
                EmissionsFromGas.Count();
            int numberOfValuesRecordedFromEmissionsFromGasPerHour = 
                (numberOfValuesRecordedForEmissionsFromGas / HOURS);

            //GETTING HOUR AVERAGE FOR GAS - This returns the average gas
            //emissions per hour from the JB frame
            //List<double> averageEachHour = new List<double>();
            double totalOfWholeDay = 0;
            double[] averageEmissionsPerHour = new double[HOURS];
            for (int i = 0; i < HOURS; i++)
            {
                // We could probably write to a csv file here - include the
                // hour of the day and the average c02 emission.
                List<double> hoursWorthOfValues = new List<double>();
                hoursWorthOfValues = EmissionsFromGas.GetRange(
                    (i * numberOfValuesRecordedFromEmissionsFromGasPerHour), 
                    numberOfValuesRecordedFromEmissionsFromGasPerHour);
                totalOfWholeDay = totalOfWholeDay + hoursWorthOfValues.Sum();

                double average = hoursWorthOfValues.Sum() / 
                    hoursWorthOfValues.Count();

                averageEmissionsPerHour[i] = average;
            }

            List<double> returnValues = new List<double>(averageEmissionsPerHour);
            
            
            return Ok(returnValues);
        }



        [HttpGet]
        [Route("EmissionsToCSV")]

        //MAKES A REQUEST FOR THE AVERAGE DATA AND WILL PRINT IT AS A CSV FOR THE MACHINE LEARNING

        public async Task<IActionResult> EmissionsToCSV(
           [FromServices] IndustrialAppStoreHttpClient iasClient, int points,
           [FromQuery] string[] tagNames, string dataSourceName,
           DateTime startTime, DateTime endTime)
        {

            TimeSpan difference = endTime.Subtract(startTime);
            int HOURS = (int)difference.TotalHours;


            int DAYS = (int)difference.TotalDays;


            


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

            // tagNames[0] will always be the load value - in this case it
            // will be john brown.
            HistoricalTagValues JBLoad = plotTags[dataSourceName][tagNames[0]];
            HistoricalTagValues JBGasFlowRate = plotTags[dataSourceName]
                [tagNames[1]];
            HistoricalTagValues JBDieselFlowRate = plotTags[dataSourceName]
                [tagNames[2]];

    

            //FOR NOW 24 HOURS IS USED FOR EVERYTHING TO MAKE SURE IT WORKS

            //GETTING LISTS OF VALUES
            //List<double> returnValues = new List<double>();
            List<double> JBLoadValues = valuesOfATag(JBLoad);
            List<double> JBGasFlowRateValues = valuesOfATag(JBGasFlowRate);
            List<double> JBDieselFlowRateValues = valuesOfATag(
                JBDieselFlowRate);

  


            //GETTING THE TONNES OF GAS PER HOUR - this returns a list of
            //values for the tonnes of gas per hour in the JB Frame
            List<double> EmissionsFromGas = new List<double>();
            foreach (double value in JBGasFlowRateValues)
            {
                double val = value / 1000;
                //value = value / 1000;
                EmissionsFromGas.Add((val * 2.656159));
            }


                        //IF YOU WANT THE AVERAGES PER HOUR THIS IS THE CODE FOR IT
                        int numberOfValuesRecordedForEmissionsFromGas =
                            EmissionsFromGas.Count();
                        int numberOfValuesRecordedFromEmissionsFromGasPerHour =
                            (numberOfValuesRecordedForEmissionsFromGas / HOURS);

                        //GETTING HOUR AVERAGE FOR GAS - This returns the average gas
                        //emissions per hour from the JB frame
                        //List<double> averageEachHour = new List<double>();
                        double totalOfWholeDay = 0;
                        double[] averageEmissionsPerHour = new double[HOURS];
                        for (int i = 0; i < HOURS; i++)
                        {
                            // We could probably write to a csv file here - include the
                            // hour of the day and the average c02 emission.
                            List<double> hoursWorthOfValues = new List<double>();
                            hoursWorthOfValues = EmissionsFromGas.GetRange(
                                (i * numberOfValuesRecordedFromEmissionsFromGasPerHour),
                                numberOfValuesRecordedFromEmissionsFromGasPerHour);
                            totalOfWholeDay = totalOfWholeDay + hoursWorthOfValues.Sum();

                            double average = hoursWorthOfValues.Sum() /
                                hoursWorthOfValues.Count();

                            averageEmissionsPerHour[i] = average;
                        }


            int numberOfValues = EmissionsFromGas.Count();
            int numberOfValuesPerDay = numberOfValues / DAYS;

            double totalOfWholeYear = 0;
            double[] averagePerDay = new double[DAYS];
            double[] sumsPerDay = new double[DAYS];
            Dictionary<DateTime, double> DayAndSumOfEmissionsFromThatDay = new Dictionary<DateTime, double>();

            DateTime dateCorrespondingToEmissions = startTime;

            for (int i = 0; i < DAYS; i++)
            {

                List<double> daysWorthOfValues = new List<double>();

                daysWorthOfValues = EmissionsFromGas.GetRange(
                    (i * numberOfValuesPerDay),
                    numberOfValuesPerDay);


                sumsPerDay[i] = daysWorthOfValues.Sum();
                DayAndSumOfEmissionsFromThatDay.Add(dateCorrespondingToEmissions, sumsPerDay[i]);

                totalOfWholeYear = totalOfWholeYear + daysWorthOfValues.Sum();

                double average = daysWorthOfValues.Sum() /
                    daysWorthOfValues.Count();

                averagePerDay[i] = average;

                dateCorrespondingToEmissions = dateCorrespondingToEmissions.AddDays(1);
            }

            Trace.WriteLine("Testing");
            Trace.Flush();

            using (var w = new StreamWriter("EmissionsSumsPerDayForTraining.csv"))
            {
                int i = 0;

                //while (i < DAYS)
                foreach (KeyValuePair<DateTime, double> dasoemft in DayAndSumOfEmissionsFromThatDay)
                {
                    {
                        String newLine = String.Format("{0: dd/MM/yyyy}", dasoemft.Key) + "," + dasoemft.Value;

                        try
                        {

                            w.WriteLine(newLine);
                            w.Flush();
                        }

                        catch (Exception e)
                        {
                            Trace.WriteLine("Failed!");
                            Trace.WriteLine(e.ToString());
                        }
                        i++;
                    }
                    
                }

                w.Close();



            }








            //List<double> returnValues = new List<double>(averageEmissionsPerHour);
            Trace.WriteLine("" + DayAndSumOfEmissionsFromThatDay);

            return Ok(DayAndSumOfEmissionsFromThatDay);
        }


















        /*[HttpGet]
        [Route("OverallConsumptionOfPowerByAllMachines")]

        //MAKES A REQUEST FOR THE AVERAGE DATA

        public async Task<IActionResult> OverallConsumptionOfPowerByAllMachines(
           [FromServices] IndustrialAppStoreHttpClient iasClient, int points,
           [FromQuery] string[] tagNames, string dataSourceName,
           DateTime startTime, DateTime endTime)
        {

            TimeSpan difference = endTime.Subtract(startTime);
            int HOURS = (int)difference.TotalHours;

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

            // tagNames[0] will always be the load value - in this case it
            // will be john brown.
            HistoricalTagValues JBLoad = plotTags[dataSourceName][tagNames[0]];
            HistoricalTagValues JBGasFlowRate = plotTags[dataSourceName]
                [tagNames[2]];
            HistoricalTagValues JBDieselFlowRate = plotTags[dataSourceName]
                [tagNames[3]];

            HistoricalTagValues SMLoad = plotTags[dataSourceName][tagNames[4]];
            HistoricalTagValues SMGasFlowRate = plotTags[dataSourceName]
                [tagNames[6]];

            HistoricalTagValues waterPumpA = plotTags[dataSourceName]
                [tagNames[7]];
            HistoricalTagValues waterPumpB = plotTags[dataSourceName]
                [tagNames[8]];
            HistoricalTagValues waterPumpC = plotTags[dataSourceName]
                [tagNames[9]];
            HistoricalTagValues waterPumpD = plotTags[dataSourceName]
                [tagNames[10]];
            HistoricalTagValues waterPumpE = plotTags[dataSourceName]
                [tagNames[11]];

            //FOR NOW 24 HOURS IS USED FOR EVERYTHING TO MAKE SURE IT WORKS

            //GETTING LISTS OF VALUES
            //List<double> returnValues = new List<double>();
            List<double> JBLoadValues = valuesOfATag(JBLoad);
            List<double> JBGasFlowRateValues = valuesOfATag(JBGasFlowRate);
            List<double> JBDieselFlowRateValues = valuesOfATag(
                JBDieselFlowRate);

            List<double> SMLoadValues = valuesOfATag(SMLoad);
            List<double> SMLoadGasFlowRate = valuesOfATag(SMGasFlowRate);

            List<double> waterPumpAValues = valuesOfATag(waterPumpA);
            List<double> waterPumpBValues = valuesOfATag(waterPumpB);
            List<double> waterPumpCValues = valuesOfATag(waterPumpC);
            List<double> waterPumpDValues = valuesOfATag(waterPumpD);
            List<double> waterPumpEValues = valuesOfATag(waterPumpE);


            //GETTING THE TONNES OF GAS PER HOUR - this returns a list of
            //values for the tonnes of gas per hour in the JB Frame
             List<double> EmissionsFromGas = new List<double>();
             foreach (double value in JBGasFlowRateValues)
             {
                 EmissionsFromGas.Add((value * 2.656159));
             }



             List<HistoricalTagValues> allTheMachines = new List<HistoricalTagValues>();
             allTheMachines.Add(JBLoad);
             allTheMachines.Add(JBGasFlowRate);
             allTheMachines.Add(JBDieselFlowRate);
             allTheMachines.Add(SMLoad);
             allTheMachines.Add(SMGasFlowRate);
             allTheMachines.Add(waterPumpA);
             allTheMachines.Add(waterPumpB);
             allTheMachines.Add(waterPumpC);
             allTheMachines.Add(waterPumpD);
             allTheMachines.Add(waterPumpE);

             List<List<double>> all = OverallPowerConsumption(allTheMachines, 0, HOURS);


             List<List<double>> returnValues = new List<List<double>>(all);
             Trace.WriteLine("" + returnValues);

             return Ok(returnValues);
         }*/



        [HttpGet]
        [Route("EmissionsForMachines")]

        /**
         * Author: Bolaji + Thomas Cotter (added this wrapper function)
         * About: this function returns the overall power consumption per hour for each machine passed in
         */

        public async Task<IActionResult> GetEmissionDataForMultipleMachines (
            [FromServices] IndustrialAppStoreHttpClient iasClient, int points,
            [FromQuery] string[] tagNames, string dataSourceName,
            DateTime startTime, DateTime endTime, int capacity)
        {


            TimeSpan difference = endTime.Subtract(startTime);
            int HOURS = (int)difference.TotalHours;

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

            List<HistoricalTagValues> allMachines = new List<HistoricalTagValues>();

            for (int i = 0; i < tagNames.Length; i++)
            {
                allMachines.Add(plotTags[dataSourceName][tagNames[i]]);
            }

            return Ok(OverallPowerConsumption(allMachines, capacity, HOURS));
        }


        // Getting hourly FLC per machine, USING THE HISTORICAL TAG -
        // This takes a historical tag
        // and then returns the hourly FLC
        // for that machine, so to call it for water pump A it would be
        // HourlyFLCPerMachine(WaterPumpA)  and it would return a list of
        // doubles
        public List<double> HourlyFLCPerMachine(
            HistoricalTagValues machinesData, int HOURS)
        {
            //int numberOfEntries = machinesData.Values.Count();

            List<List<double>> datum3 = new List<List<double>>();
            List<double> datum = valuesOfATag(machinesData);
            int numberOfEntries = datum.Count();
            int numberOfEntriesPerHour = numberOfEntries / HOURS;

            List<double> entriesAveragePerHour = new List<double>();
            int multiple = 1;
            for(int i =0; i < HOURS; i++)
            {
                //double[] datum2 = datum.ToArray();

                // machinesData.Values.ElementAt(i).NumericValue;
                double[] datumPerHour = new double[HOURS];
                // datumPerHour[i] =

                int indexToStartFrom = i * numberOfEntriesPerHour;


                //f ((numberOfEntries - (indexToStartFrom + numberOfEntriesPerHour))-1 < 0)



                try
                {
                    datum3.Add(datum.GetRange(i * numberOfEntriesPerHour,
                        numberOfEntriesPerHour));
                }
                catch
                {
                    //if ()

                    //else {
                    Trace.WriteLine(datum.Count() + ", " + indexToStartFrom + ", " + (numberOfEntries - indexToStartFrom - 1));
                    Trace.Flush();

                    datum3.Add(datum.GetRange(i * numberOfEntriesPerHour,
                                    (numberOfEntries - indexToStartFrom-1)));


                    
                    //      }
                }
                
                

                //multiple++;
                // print(type(hourWorthOfData));
                // print(hourWorthOfData);
                // print(type(sum(hourWorthOfData)));
                // print(type(len(hourWorthOfData)));
                
            }

            for(int j = 0; j < HOURS; j++)
            {
                double average = datum3.ElementAt(j).Sum() /
                    datum3.ElementAt(j).Count();
                // print(type(average));
                // print(average);
                entriesAveragePerHour.Add(average);
            }
            return entriesAveragePerHour;
        }

        /* We need a function here that can work out the efficiency of 
         * specified machines 
         */


        //POWER CONSUMPTION BASED ON THE FLC PER HOUR
        //THIS WILL TAKE THE MACHINE AND THE CAPACITY OF IT
        //THINK WE SHOULD FIND WHICH DATA STORES THE CAPACITY OF
        //EACH MACHINE FOR US?
        public List<double> PowerConsumptionBasedOnFLCPerHour(
            HistoricalTagValues machinesData, int capacity, int HOURS)
        {
            List<double> PowConBasedOnFLC = new List<double>();
            List<double> hourly = HourlyFLCPerMachine(machinesData, HOURS);
            foreach (double d in hourly) {
                PowConBasedOnFLC.Add((d * capacity)/1000); //CONVERTED FROM KW TO MW (a/1000)
            }

            return PowConBasedOnFLC;
        }

        //THIS IS AN ISSUE, I DONT THINK ITS POSSIBLE TO CALL THIS FROM
        //WHERE THE TAG VALUES ARE FETCHED EARLIER
        //SOLVED: I WILL MAKE THIS ANOTHER TASK
        public List<List<double>> OverallPowerConsumption(List<HistoricalTagValues> allMachines, 
            int capacity, int HOURS)
        {
            List<List<double>> overall = new List<List<double>>();
            //double[] overalls = new double[24];
            //List<double>[] over = new List<double>[]();
           //int counter = 0;

            foreach (HistoricalTagValues m in allMachines)
            {
                overall.Add(PowerConsumptionBasedOnFLCPerHour(m, capacity, HOURS));

                //foreach(double value in
                //PowerConsumptionBasedOnFLCPerHour(m, capacity))
                //{
                  //  overalls
                    //overalls[counter] += value;
                  //  counter++;
               // }

                // foreach (double d in overall)
                //{

                //d.Add(PowerConsumptionBasedOnFLCPerHour(m, capacity));
                //}

            }
            //overall = overalls.ToList();
            return overall;
        }







        public double[][] toArr(List<List<double>> list, int numOfMachines)
        {
            double[][] d = new double[numOfMachines][];
            int index = 0;

            foreach (List<double> l in list)
            {
                double[] a = l.ToArray();
                d[index] = a;
                index++;
            }
            return d;
        }

        public class ratioData
        {
            public double[] allMachines { get; set; }
            public double[][] d { get; set; }
        }

        public List<List<double>> rawRatios(ratioData rd, int numOfmachines, int HOURS)
        {

            List<List<double>> rawRatiosList = new List<List<double>>();
            double[][] d = rd.d;
            double[] allMachines = rd.allMachines;


            for (int i = 0; i < HOURS; i++)
            {
                
               List<double> powerConsumptionAtCertainHour = new List<double>();
                for(int j = 0; j < numOfmachines; j++)
                {
                    powerConsumptionAtCertainHour.Add(d[j][i]);
                }

                double sum = powerConsumptionAtCertainHour.Sum();
                List<double> raws = new List<double>();

                for (int k = 0; k < numOfmachines; k++)
                {
                    double ratioCurrent = powerConsumptionAtCertainHour[k] 
                        / sum;
                    raws.Add(ratioCurrent);
                }

                rawRatiosList.Add(raws);

               // powerConsumptionAtCertainHour.Append(allMachines[i]);

            }

            return rawRatiosList;
        }


        //THIS IS TO GET THE VALUE OF A TAG, THIS IS TOM's CODE

        private List<double> valuesOfATag(HistoricalTagValues tagToLoad)

        {
            List<double> individualValues = new List<double>();
            
            foreach (TagValue tv in tagToLoad.Values)
            {

                if (tv.NumericValue.ToString() != "NaN" /*&& tv.NumericValue > 0*/)
                {
                    double formattedValue = convertUnit(tv.NumericValue, 
                        tv.Unit);
                    individualValues.Add(formattedValue);
                }

            }

            return individualValues;
        }


        //THIS IS TO CONVERT UNITS, THIS IS TOM's CODE


        private double convertUnit(double value, string unit)
        {
            // if any units come in weird formats they will be converted
            // into what the main function thinks they will be in order to
            // convert them into tonnes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               6 
            if (unit == "kg/hr")
            {
                return value;
            }
            else if (unit == "kg/day")
            {
                return (1 / 24) * value;
            }
            else
            {
                // this will be used for MMscf soon.
                return value;
            }
        }
    }
}