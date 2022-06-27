
using System;
using SampleRegression.Model;
using PLplot;
using System.Diagnostics;
using Microsoft.ML.Data;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Globalization;
using System.Text;

/**
 * Author: Housu Zhang
 * Time: 03/14/2021
 * Description: This project is used to predict the carbon emission from a single tag. The only needed file is a .csv file.
 * 
 */

namespace SampleRegression.ConsoleApp
{
    class Program
    {
        // Define the max input number and the file path
        public const int MAX_LENGTH = 60;
        public const int DATA_LENGTH = 40;
        public const int MONTH_INDEX = 24;
        private static string TRAIN_DATA_FILEPATH = "EmissionsSumsPerDayForTraining.csv";

        static void Main(string[] args)
        {


            int len = getCsvLen(TRAIN_DATA_FILEPATH);
            //Console.WriteLine(len);
            //var trainData = new CsvReader().GetDataFromCsv(TRAIN_DATA_FILEPATH, len).ToList();

            //getNames(TRAIN_DATA_FILEPATH);


            //if (csvGenerate(trainData, len))
            //{
            //    Console.WriteLine("csv generate sucessfully");
            //}
            //else
            //{
            //    Console.WriteLine("csv generate false");
            //}

            string[] test = predictArray();

            //var result = prediction(trainData,len);

            //drawData(trainData, args, len);
            //drawPredictionImage(trainData, args, len);

            //Console.ReadKey();
        }

        /**
         * Author: Housu Zhang
         * Time: 02/05/2021
         * Description: generate the predict data
         */

        public static string[] predictArray()
        {
            string[] predictData = new string[MONTH_INDEX];
            string[] dayResult = new string[MONTH_INDEX];
            DateTime start = DateTime.Now;
            DateTime next = start;
            float value = 0;
            string temp = "";

            for (int i = 0; i < MONTH_INDEX; i += 2)
            {
                temp = String.Format("{0: dd/MM/yyyy}", start);
                ModelInput sampleData = new ModelInput();
                sampleData.Time = temp;
                var predictionResult = ConsumeModel.Predict(sampleData);

                dayResult[i] = temp;
                //dayResult[i + 1] = Convert.ToString(predictionResult.Score);
                //Console.WriteLine(dayResult[i] + " " + dayResult[i + 1]);

                start = start.AddMonths(1);
                next = start;
                for (int j=0; j<30; j++)
                {
                    value += predictionResult.Score;
                    next = next.AddDays(1);
                    temp = String.Format("{0: dd/MM/yyyy}", next);
                    sampleData.Time = temp;
                    predictionResult = ConsumeModel.Predict(sampleData);
                }

                dayResult[i + 1] = Convert.ToString(value);
                Console.WriteLine(dayResult[i] + " " + dayResult[i + 1]);
                value = 0;
            }

            predictData = dayResult;


            return predictData;
        }

        /**
         * Author: Housu Zhang
         * Time: 14/03/2021
         * Description: getCsvLen return the length of .csv file
         */
        private static int getCsvLen(string path)
        {
            var reader = new StreamReader(File.OpenRead(path));
            int len = 0;
            while (reader.ReadLine() != null)
            {
                len++;
            }

            return len;
        }

        /**
         * Author: Housu Zhang
         * Time: 15/03/2021
         * Description: return tag name if we need
         */
        private static string[] getNames(string path)
        {
            var reader = new StreamReader(File.OpenRead(path));
            string nameString = reader.ReadLine();
            string[] names = nameString.Split(',');

            //Console.WriteLine(names[0]);
            return names;
        }
        /**
         * Author: Housu Zhang
         * Time: 14/03/2021
         * Description: Get the predicted data based on the input time array.
         */

        private static float[] prediction(List<Data> trainData, int len)
        {
            float[] result = new float[MAX_LENGTH];
            string[] timeList = new string[MAX_LENGTH];
            timeList = getTimeList(trainData, len);



            for (int i = 0; i < MAX_LENGTH; i++)
            {
                ModelInput sampleData = new ModelInput();
                sampleData.Time = timeList[i];
                var predictionResult = ConsumeModel.Predict(sampleData);


                result[i] = predictionResult.Score;
                //Console.WriteLine($"Time: {sampleData.Time}");
                //Console.WriteLine($"\n{i}\nPredicted Carbonemission: {predictionResult.Score}\n\n");

            }



            return result;
        }

        /**
         * Author: Housu Zhang
         * Time: 14/03/2021
         * Description: get the time list of prediction values
         */
        private static string[] getTimeList(List<Data> trainData, int len)
        {
            string[] timeList = new string[MAX_LENGTH];
            float p = len / DATA_LENGTH;
            int period = (int)Math.Floor(p);
            for (int i = 0; i < DATA_LENGTH; i++)
            {
                timeList[i] = Convert.ToString(trainData[i * period].Time);
            }

            string lastTime = trainData[len - 2].Time;
            DateTime time = Convert.ToDateTime(lastTime);

            for (int i = DATA_LENGTH; i < MAX_LENGTH; i++)
            {
                time = time.AddMinutes(10);
                timeList[i] = Convert.ToString(time);
            }

            return timeList;
        }

        /**
         * Author: Housu Zhang
         * Time: 15/03/2021
         * Description: Generate a csv file
         */

        private static bool csvGenerate(List<Data> trainData, int len)
        {
            string[] timeList = new string[MAX_LENGTH + len];
            float[] result = new float[MAX_LENGTH + len];
            string savePath = @"predictionData.csv";
            string temp = "";
            DateTime tempT;

            if (File.Exists(savePath))
            {
                File.Delete(savePath);
            }

            string line = "";

            StreamWriter sw = new StreamWriter(new FileStream(savePath, FileMode.Create, FileAccess.Write), Encoding.Default);

            try
            {
                for (int i = 0; i < len - 1; i++)
                {
                    // make the same type
                    temp = Convert.ToString(trainData[i].Time);
                    tempT = Convert.ToDateTime(temp);
                    timeList[i] = Convert.ToString(tempT);
                    //Console.WriteLine(timeList[i]);

                    ModelInput sampleData = new ModelInput();
                    sampleData.Time = timeList[i];
                    //Console.WriteLine(sampleData.Time + " " + sampleData.Values);
                    var predictionResult = ConsumeModel.Predict(sampleData);
                    result[i] = predictionResult.Score;
                    //Console.WriteLine(result[i]);


                    string connect = timeList[i].Replace(" ", "-");
                    line = Convert.ToString(result[i]) + "," + connect;
                    sw.WriteLine(line);
                }

                tempT = Convert.ToDateTime(temp);
                for (int j = len - 1; j < MAX_LENGTH + len - 1; j++)
                {
                    tempT = tempT.AddMinutes(10);
                    timeList[j] = Convert.ToString(tempT);
                    //Console.WriteLine(timeList[j]);

                    ModelInput sampleData = new ModelInput();
                    sampleData.Time = timeList[j];
                    var predictionResult = ConsumeModel.Predict(sampleData);
                    result[j] = predictionResult.Score;

                    string[] sub = timeList[j].Split(" ");
                    string connect = timeList[j].Replace(" ", "-");
                    line = Convert.ToString(result[j]) + "," + connect;
                    sw.WriteLine(line);
                }
                sw.Close();
                sw.Dispose();

                return true;
            }
            catch
            {
                sw.Close();
                return false;
            }

        }

        /**
         * Author: Housu Zhang
         * Time: 14/03/2021
         * Description: Plot the picture of the data
         */

        private static void drawData(List<Data> trainData, string[] args, int len)
        {
            string chartFileName = "";
            using (var pl = new PLStream())
            {
                // use SVG backend and write to SineWaves.svg in current directory
                if (args.Length == 1 && args[0] == "svg")
                {
                    pl.sdev("svg");
                    chartFileName = "CarbonEmissionData.png";
                    pl.sfnam(chartFileName);
                }
                else
                {
                    pl.sdev("pngcairo");
                    chartFileName = "CarbonEmissionData.png";
                    pl.sfnam(chartFileName);
                }

                // use white background with black foreground
                pl.spal0("cmap0_alternate.pal");

                // Initialize plplot
                pl.init();


                // set axis limits
                const int xMinLimit = 0;
                const int xMaxLimit = DATA_LENGTH;
                const int yMinLimit = 0;
                const int yMaxLimit = DATA_LENGTH;

                pl.env(xMinLimit, xMaxLimit, yMinLimit, yMaxLimit, AxesScale.Independent, AxisBox.BoxTicksLabelsAxes);

                pl.schr(0, 1.25);

                // The main title
                string time = "Time (From " + trainData[0].Time + " to " + trainData[len - 2].Time + ")";
                pl.lab(time, "CarbonEmission/t", "Carbon Emission");

                pl.col0(1);

                // ************************************
                // *  Draw points in the my_data.csv  *
                // ************************************


                //This code is the symbol to paint
                char code = (char)9;
                pl.col0(2); //Blue

                float per = len / DATA_LENGTH;

                int period = (int)Math.Floor(per);
                for (int i = 0; i < DATA_LENGTH; i++)
                {
                    var x = new double[1];
                    var y = new double[1];


                    x[0] = i;
                    y[0] = trainData[i * period].Values;

                    //Paint a dot
                    pl.poin(x, y, code);

                }

                pl.eop();

                // output version of PLplot
                pl.gver(out var verText);
                Console.WriteLine("PLplot version " + verText);

            }

            // Showing the chart
            Console.WriteLine("Showing chart...");
            var p = new Process();
            string chartFileNamePath = @".\" + chartFileName;
            p.StartInfo = new ProcessStartInfo(chartFileNamePath)
            {
                UseShellExecute = true
            };
            p.Start();

        }


        private static void drawPredictionImage(List<Data> trainData, string[] args, int len)
        {
            string chartFileName = "";
            string[] timeList = new string[MAX_LENGTH];
            float[] values = new float[MAX_LENGTH];
            timeList = getTimeList(trainData, len);
            values = prediction(trainData, len);

            using (var pl = new PLStream())
            {
                // use SVG backend and write to SineWaves.svg in current directory
                if (args.Length == 1 && args[0] == "svg")
                {
                    pl.sdev("svg");
                    chartFileName = "CarbonEmissionPrediction.png";
                    pl.sfnam(chartFileName);
                }
                else
                {
                    pl.sdev("pngcairo");
                    chartFileName = "CarbonEmissionPrediction.png";
                    pl.sfnam(chartFileName);
                }

                // use white background with black foreground
                pl.spal0("cmap0_alternate.pal");

                // Initialize plplot
                pl.init();


                // set axis limits
                const int xMinLimit = 0;
                const int xMaxLimit = MAX_LENGTH;
                const int yMinLimit = 0;
                const int yMaxLimit = MAX_LENGTH;


                pl.env(xMinLimit, xMaxLimit, yMinLimit, yMaxLimit, AxesScale.Independent, AxisBox.BoxTicksLabelsAxes);

                pl.schr(0, 1.25);
                DateTime tempTime = Convert.ToDateTime(timeList[0]);

                // The main title
                string time = "Time (From " + Convert.ToString(tempTime) + " to " + timeList[MAX_LENGTH - 1] + ")";
                pl.lab(time, "CarbonEmission/t", "Carbon Emission Prediction");

                pl.col0(1);

                // ************************************
                // *  Draw points of prediction data  *
                // ************************************


                //This code is the symbol to paint
                char code = (char)9;
                pl.col0(4); //red

                for (int i = 0; i < MAX_LENGTH; i++)
                {
                    var x = new double[1];
                    var y = new double[1];


                    x[0] = i;
                    y[0] = values[i];

                    //Paint a dot
                    pl.poin(x, y, code);

                }

                pl.eop();

                // output version of PLplot
                pl.gver(out var verText);
                Console.WriteLine("PLplot version " + verText);

            }

            // Showing the chart
            Console.WriteLine("Showing chart...");
            var p = new Process();
            string chartFileNamePath = @".\" + chartFileName;
            p.StartInfo = new ProcessStartInfo(chartFileNamePath)
            {
                UseShellExecute = true
            };
            p.Start();

        }


    }

    /**
     * Author: Housu Zhang
     * Time: 14/03/2021
     * Description: read the csv file
     */
    public class CsvReader
    {
        public IEnumerable<Data> GetDataFromCsv(string dataLocation, int numMaxRecords)
        {
            IEnumerable<Data> records =
                File.ReadAllLines(dataLocation)
                .Skip(1)
                .Select(x => x.Split(','))
                .Select(x => new Data()
                {
                    Values = float.Parse(x[0], CultureInfo.InvariantCulture),
                    Time = x[1],

                })
                .Take<Data>(numMaxRecords);

            return records;
        }
    }

    public class Data
    {
        [LoadColumn(0)]
        public string Time;

        [LoadColumn(1)]
        public float Values;
    }
}
