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

namespace MyNewApp.Controllers
{

    [Route("Home/api/[controller]")]
    [ApiController]

    /**
     * Author: Thomas Cotter
     * Usage: Use this controller for methods that create .csv files for 
     * ML training data.
     */
    public class TrainingDataController : ControllerBase
    {
        /**
          * Author: Thomas Cotter
          * About: This function will produce a .csv file of all the data from 
          * the past "timeframe" from all the tags in the datasource. 
          */
        [HttpGet]
        [Route("PCASetUp")]

        public async Task StorePCAValues(
            [FromServices] IndustrialAppStoreHttpClient iasClient, int points,
            [FromQuery] string[] tagNames, string dataSourceName,
            DateTime startTime, DateTime endTime)
        {

            int[] failedPages = { 
                95, 96, 121, 122, 240, 241, 254, 302, 377, 381, 383, 1022, 
                1028, 1029, 1030, 1031, 1033, 1043, 1055, 1057, 1059, 1086, 
                1088, 1098, 1099, 1100, 1101, 1102, 1103, 1104, 1105, 1106, 
                1107, 1108, 1109, 1110, 1111, 1112, 1113, 1117, 1118, 1119, 
                1120, 1121, 1122, 1123, 1127, 1133, 1139, 1144, 1147, 1148, 
                1149, 1152, 1153, 1154, 1156, 1188 };

            using (var w = new StreamWriter("PCATrainingData_Failed.csv"))
            {
                int i = 0;
                int count = 1;

                while (count > 0)
                {

                    Trace.WriteLine(failedPages[i]);
                    
                    count = 0;

                    List<string> tn = new List<string>();

                    var TagRequest = new FindTagsRequest()
                    {
                        DataSourceName = dataSourceName,

                        Filter = new TagSearchFilter("*")
                        {
                            Page = failedPages[i],
                            PageSize = TagSearchFilter.MaximumPageSize
                        }
                    };

                    i += 1;

                    var tags = 
                        await iasClient.DataSources.FindTagsAsync(
                            TagRequest, Request.HttpContext);

                    Trace.WriteLine(tags.Count());

                    foreach (TagSearchResult tsr in tags)
                    {
                        tn.Add(tsr.Id);
                        count += 1;
                    }

                    Trace.WriteLine(i);
                    Trace.WriteLine(count);

                    tagNames = tn.ToArray();

                    if (count > 0)
                    {
                        var request = new ReadPlotTagValuesRequest()
                        {

                            StartTime = startTime,
                            EndTime = endTime,

                            Tags = new Dictionary<string, string[]>() {
                                {dataSourceName, tagNames}
                            },

                            Intervals = points
                        };

                        try
                        {

                            var plotTags = 
                                await 
                                iasClient.DataSources.ReadPlotTagValuesAsync(
                                    request, Request.HttpContext);
                            HistoricalTagValuesDictionary htvd = 
                                plotTags[dataSourceName];

                            foreach (KeyValuePair<string, HistoricalTagValues> 
                                entry in htvd)
                            {
                                Trace.WriteLine(entry.Key);
                                string tagName = entry.Key;
                                string tagValues = "";

                                foreach (TagValue tv in (entry.Value).Values)
                                {
                                    tagValues = tagValues + tv.NumericValue + 
                                        ",";
                                }

                                if (tagValues.Length > 0)
                                {
                                    tagValues = tagValues.Remove(
                                        tagValues.Length - 1);

                                    string newLine = tagName + "," + tagValues;
                                    w.WriteLine(newLine);
                                    w.Flush();
                                }
                            }
                        }
                        catch (Exception e)
                        {
                            Trace.WriteLine("Failed!");
                            Trace.WriteLine(e.ToString());
                        }
                    }
                }

                w.Close();
            }
        }
    }
}
