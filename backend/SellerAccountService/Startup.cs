using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SharedClasses;
using SellerAccountService.Models;

namespace SellerAccountService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = CreateConfiguration();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            //services.AddControllers();

            services.AddControllers().AddNewtonsoftJson();
            var pgConnection = Configuration.GetSection("PgConnection").Get<PgConnection>();
            var dbTables = Configuration.GetSection("DBTables").Get<DBTables>();
            var pks = Configuration.GetSection("PrimaryKeys").Get<PrimaryKeys>();
            services.AddSingleton<PgConnection>(pgConnection);
            services.AddSingleton<DBTables>(dbTables);
            services.AddSingleton<PrimaryKeys>(pks);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            var FrontendRoutes = Configuration.GetSection("FrontendRoutes").Get<FrontendRoutes>();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseCors(
                options => options.WithOrigins(FrontendRoutes.BaseUrl).AllowAnyMethod().AllowAnyHeader()
            );

            //app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        // I think this enabled dynamic reload of config?
        private IConfiguration CreateConfiguration()
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(System.IO.Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production"}.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();

            return config.Build();
        }
    }
}
