//*****************************************************************************************
//*                                                                                       *
//* This is an auto-generated file by Microsoft ML.NET CLI (Command-Line Interface) tool. *
//*                                                                                       *
//*****************************************************************************************

using Microsoft.ML.Data;

namespace SampleRegression.Model
{
    public class ModelInput
    {
        [ColumnName("values"), LoadColumn(0)]
        public float Values { get; set; }


        [ColumnName("time"), LoadColumn(1)]
        public string Time { get; set; }


    }
}
