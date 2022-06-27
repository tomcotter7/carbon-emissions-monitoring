using IntelligentPlant.IndustrialAppStore.Authentication;
using IntelligentPlant.IndustrialAppStore.Client;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IntelligentPlant.DataCore.Client.Queries;

namespace MyNewApp.Controllers
{
    [Route("Home/api/[controller]")] // Defining the URL of the controller
    [ApiController] // Tag to signify an ApiController

    public class DataLoadController : ControllerBase
    // A lot of this stuff is done automatically when you create a controller
    {
        [HttpGet] // To signify that we're getting data
        [Route("values")] // Defining the URL of the controller
        /*
         * The below function requires some explanation.
         * The first parameter should always be an 
         * IndustrialAppStoreHttpClient, which requires the [FromServices]
         * tag before it takes parameters like points, startTime and endTime
         * depend on the data we want.
         * dataSourceName is nothing special: 
         * exactly what it describes and obviously needed
         * tagNames is complicated; just know that you will definitely
         * need it with a [FromQuery] before it
         */
        public async Task<IActionResult> GetValues([FromServices] 
        IndustrialAppStoreHttpClient iasClient, int points, [FromQuery] 
        string[] tagNames, string dataSourceName,
            DateTime startTime, DateTime endTime)
        {
            // This object basically holds the query we're performing and will 
            // vary depending on what data we want

            var request = new ReadPlotTagValuesRequest()
            {
                // Below defines all the fields of request that we need. 
                // Sort of like a constructor, but not really.

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
    }
}
