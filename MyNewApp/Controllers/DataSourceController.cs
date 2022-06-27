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
    /*
     * The goal of this controller will be to load all
     * the data sources in our own way, so we can load
     * data from them with our own user interface.
     * 
     * As of now, it loads just one data source via its name,
     * which is not quite what we want. This is more of a test
     * to see if I can write a controller from scratch and have it
     * succeed.
     * 
     * In future, it should request ALL the data sources from the server
     * somewhere.
     */
    [Route("api/[controller]")]
    [ApiController]

    public class DataSourceController : ControllerBase
    {
        [HttpGet]
        [Route("sources")]

        public async Task<IActionResult> GetDataSources(
            [FromServices] IndustrialAppStoreHttpClient iasClient, 
            [FromQuery]string name)
        {
            var request = new DataSourceRequest();
            request.DataSourceName = name;

            var makeRequest = await iasClient.DataSources.GetDataSourceAsync(
                request.DataSourceName, Request.HttpContext);

            return Ok(makeRequest);
        }
    }
}
