using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace MyNewApp.Models
{
    /**
     * Author : Thomas Cotter
     * 
     * Reason: This is used in Dashboard.cshtml for any requests to the
     *         Intelligent Plant server
     */
    public class DashboardViewModel {

        public string DataSourceName { get; set; }

        public IEnumerable<SelectListItem> DataSources { get; set; }
    }
}
