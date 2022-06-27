using System;
using System.Collections.Generic;
using IntelligentPlant.DataCore.Client.Model;

namespace MyNewApp.Models {
    public class TagListViewModel {

        public FindTagsRequest Request { get; set; }

        public IEnumerable<TagSearchResult> Tags { get; set; } = 
            Array.Empty<TagSearchResult>();

        public bool CanPageNext { get; set; }
    }
}
