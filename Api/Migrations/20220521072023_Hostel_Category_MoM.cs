using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class Hostel_Category_MoM : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HostelCategoryHostelEntity");

            migrationBuilder.CreateTable(
                name: "Hostel_HostelCategories",
                columns: table => new
                {
                    HostelId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hostel_HostelCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Hostel_HostelCategories_HostelCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "HostelCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Hostel_HostelCategories_Hostels_HostelId",
                        column: x => x.HostelId,
                        principalTable: "Hostels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Hostel_HostelCategories_CategoryId",
                table: "Hostel_HostelCategories",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Hostel_HostelCategories_HostelId",
                table: "Hostel_HostelCategories",
                column: "HostelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Hostel_HostelCategories");

            migrationBuilder.CreateTable(
                name: "HostelCategoryHostelEntity",
                columns: table => new
                {
                    CategoriesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HostelsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HostelCategoryHostelEntity", x => new { x.CategoriesId, x.HostelsId });
                    table.ForeignKey(
                        name: "FK_HostelCategoryHostelEntity_HostelCategories_CategoriesId",
                        column: x => x.CategoriesId,
                        principalTable: "HostelCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HostelCategoryHostelEntity_Hostels_HostelsId",
                        column: x => x.HostelsId,
                        principalTable: "Hostels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HostelCategoryHostelEntity_HostelsId",
                table: "HostelCategoryHostelEntity",
                column: "HostelsId");
        }
    }
}
