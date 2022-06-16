using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class NullableFacilityForgnKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FacilityManagements_Hostels_HostelId",
                table: "FacilityManagements");

            migrationBuilder.RenameColumn(
                name: "HostelId",
                table: "FacilityManagements",
                newName: "FacilityId");

            migrationBuilder.RenameIndex(
                name: "IX_FacilityManagements_HostelId",
                table: "FacilityManagements",
                newName: "IX_FacilityManagements_FacilityId");

            migrationBuilder.AddForeignKey(
                name: "FK_FacilityManagements_Facilities_FacilityId",
                table: "FacilityManagements",
                column: "FacilityId",
                principalTable: "Facilities",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FacilityManagements_Facilities_FacilityId",
                table: "FacilityManagements");

            migrationBuilder.RenameColumn(
                name: "FacilityId",
                table: "FacilityManagements",
                newName: "HostelId");

            migrationBuilder.RenameIndex(
                name: "IX_FacilityManagements_FacilityId",
                table: "FacilityManagements",
                newName: "IX_FacilityManagements_HostelId");

            migrationBuilder.AddForeignKey(
                name: "FK_FacilityManagements_Hostels_HostelId",
                table: "FacilityManagements",
                column: "HostelId",
                principalTable: "Hostels",
                principalColumn: "Id");
        }
    }
}
