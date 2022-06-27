using Microsoft.AspNetCore.Mvc;

namespace MyNewApp.Models {
    public class LoginViewModel {

        public bool IsPersistent { get; set; }

        [HiddenInput]
        public string RedirectUrl { get; set; }
    }
}
