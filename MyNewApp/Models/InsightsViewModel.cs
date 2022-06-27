using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace MyNewApp.Models
{
    /**
     * Author : Thomas Cotter
     * 
     * Reason: This will be used to handle any requests on the 
     *         Insights.cshtml page
     */   
    public class InsightsViewModel
    {
        public string DataSourceName { get; set; }

        public IEnumerable<SelectListItem> DataSources { get; set; }
    }
}
