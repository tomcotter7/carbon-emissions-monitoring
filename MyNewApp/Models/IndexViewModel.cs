using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace MyNewApp.Models {
    public class IndexViewModel {

        public string DataSourceName { get; set; }

        public IEnumerable<SelectListItem> DataSources { get; set; }
    }
}
