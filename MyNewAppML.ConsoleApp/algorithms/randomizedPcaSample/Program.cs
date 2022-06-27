using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.ML;
using Microsoft.ML.Data;
using System.IO;

/**
 * Author: Housu
 * Time : 14/03/2021
 * Description: implement PCA algorithm to find the most effort tags
 * 
 */


namespace randomizedPcaSample
{

    
    class Program
    {
        public const int FEATURE_VALUES = 1000;
        public static string TRAIN_DATA_PATH = "PCATrainingData.csv";
        //public static string TRAIN_DATA_PATH = "testPca.csv";
        public const int NUM = 50;

        //static void Main(string[] args)
        //{

        //    string[] vs = new string[NUM];
        //    vs = pcaModel();

        //}



        static public string[] pcaModel()
        {
            var reader = new StreamReader(File.OpenRead(TRAIN_DATA_PATH));
            var samples = new List<DataPoint>();
            var tags = new List<string>();
            String line = "";
            String[] dataS;

            string[] rank = new string[NUM];

            // read file put tag names into tags and put the features into samples
            while ((line = reader.ReadLine()) != null)
            {
                float[] features = new float[FEATURE_VALUES];
                double dev = 0;
                float mean = 0;
                dataS = line.Split(',');
                for (int i = 0; i <= FEATURE_VALUES; i++)
                {
                    if (i == 0)
                    {
                        tags.Add(dataS[i]);
                    }
                    else if (i < dataS.Length)
                    {
                        if (dataS[i] == "NaN" || dataS[i] == "")
                        {
                            features[i - 1] = 0;
                        }
                        else
                        {
                            features[i - 1] = float.Parse(dataS[i]);
                        }
                    }
                    else
                    {
                        features[i - 1] = 0;
                    }
                }
                mean = getMean(features);
                dev = getDeviation(features, mean);
                
                for (int i = 0; i < features.Length; i++)
                {
                    
                    features[i] = (float)((features[i] - mean) / dev);
                }

                    samples.Add(new DataPoint()
                {
                    Features = features

                });
            }


            var mlContext = new MLContext(seed: 0);
            // Convert the List<DataPoint> to IDataView, a consumable format to
            // ML.NET functions.
            var data = mlContext.Data.LoadFromEnumerable(samples);

            // Create an anomaly detector. Its underlying algorithm is randomized
            // PCA.
            var pipeline = mlContext.AnomalyDetection.Trainers.RandomizedPca(
                featureColumnName: nameof(DataPoint.Features), rank: 1,
                    ensureZeroMean: false);

            // Train the anomaly detector.
            var model = pipeline.Fit(data);

            // Apply the trained model on the training data.
            var transformed = model.Transform(data);

            // Read ML.NET predictions into IEnumerable<Result>.
            var results = mlContext.Data.CreateEnumerable<Result>(transformed,
                reuseRowObject: false).ToList();

        
            for (int i = 0; i < samples.Count; ++i)
            {
                // The i-th example's prediction result.
                var result = results[i];

                // The i-th example's feature vector in text format.
                var featuresInText = " ";//string.Join(',', samples[i].Features);

                if (result.PredictedLabel)
                    // The i-th sample is predicted as an outlier.
                    Console.WriteLine("The {0}-th example with features [{1}] is " +
                        "an outlier with a score of being inlier {2}", i,
                            featuresInText, result.Score);
                else
                    // The i-th sample is predicted as an inlier.
                    Console.WriteLine("The {0}-th example with features [{1}] is " +
                        "an inlier with a score of being inlier {2}", i,
                        featuresInText, result.Score);

            }

            return rank;
        }

        static float getMean(float[] vs)
        {
            float mean = 0;
            float sum = 0;
            for(int i = 0; i < vs.Length; i++)
            {
                sum += vs[i];
            }
            mean = sum / vs.Length;
            return mean;
        }

        static double getDeviation(float[] vs,float mean)
        {
            double dev = 0;
            for (int i = 0; i < vs.Length; i++)
            {
                dev = (vs[i]-mean)* (vs[i] - mean);
            }
            dev = System.Math.Sqrt(dev / vs.Length);
            return dev;
        }
       
    }

    // get 100 feature values. A training data set is a collection of
    class DataPoint
    {
        [VectorType(1000)]
        public float[] Features { get; set; }
    }

    // Class used to capture prediction of DataPoint.
    class Result
    {
        // Outlier gets true while inlier has false.
        public bool PredictedLabel { get; set; }
        // Inlier gets smaller score. Score is between 0 and 1.
        public float Score { get; set; }
    }
}
