using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class ChangingName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hostel_HostelCategories_HostelCategories_CategoryId",
                table: "Hostel_HostelCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_Hostel_HostelCategories_Hostels_HostelId",
                table: "Hostel_HostelCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Hostels",
                table: "Hostels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HostelCategories",
                table: "HostelCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Hostel_HostelCategories",
                table: "Hostel_HostelCategories");

            migrationBuilder.RenameTable(
                name: "Hostels",
                newName: "Hostel");

            migrationBuilder.RenameTable(
                name: "HostelCategories",
                newName: "HostelCategory");

            migrationBuilder.RenameTable(
                name: "Hostel_HostelCategories",
                newName: "HostelWithCategory");

            migrationBuilder.RenameIndex(
                name: "IX_Hostel_HostelCategories_HostelId",
                table: "HostelWithCategory",
                newName: "IX_HostelWithCategory_HostelId");

            migrationBuilder.RenameIndex(
                name: "IX_Hostel_HostelCategories_CategoryId",
                table: "HostelWithCategory",
                newName: "IX_HostelWithCategory_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Hostel",
                table: "Hostel",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HostelCategory",
                table: "HostelCategory",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HostelWithCategory",
                table: "HostelWithCategory",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_HostelWithCategory_Hostel_HostelId",
                table: "HostelWithCategory",
                column: "HostelId",
                principalTable: "Hostel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HostelWithCategory_HostelCategory_CategoryId",
                table: "HostelWithCategory",
                column: "CategoryId",
                principalTable: "HostelCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HostelWithCategory_Hostel_HostelId",
                table: "HostelWithCategory");

            migrationBuilder.DropForeignKey(
                name: "FK_HostelWithCategory_HostelCategory_CategoryId",
                table: "HostelWithCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HostelWithCategory",
                table: "HostelWithCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HostelCategory",
                table: "HostelCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Hostel",
                table: "Hostel");

            migrationBuilder.RenameTable(
                name: "HostelWithCategory",
                newName: "Hostel_HostelCategories");

            migrationBuilder.RenameTable(
                name: "HostelCategory",
                newName: "HostelCategories");

            migrationBuilder.RenameTable(
                name: "Hostel",
                newName: "Hostels");

            migrationBuilder.RenameIndex(
                name: "IX_HostelWithCategory_HostelId",
                table: "Hostel_HostelCategories",
                newName: "IX_Hostel_HostelCategories_HostelId");

            migrationBuilder.RenameIndex(
                name: "IX_HostelWithCategory_CategoryId",
                table: "Hostel_HostelCategories",
                newName: "IX_Hostel_HostelCategories_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Hostel_HostelCategories",
                table: "Hostel_HostelCategories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HostelCategories",
                table: "HostelCategories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Hostels",
                table: "Hostels",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Hostel_HostelCategories_HostelCategories_CategoryId",
                table: "Hostel_HostelCategories",
                column: "CategoryId",
                principalTable: "HostelCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Hostel_HostelCategories_Hostels_HostelId",
                table: "Hostel_HostelCategories",
                column: "HostelId",
                principalTable: "Hostels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
