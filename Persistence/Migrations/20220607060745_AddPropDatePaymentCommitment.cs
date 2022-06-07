using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class AddPropDatePaymentCommitment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hostels_HostelCategories_HostelCategoryId",
                table: "Hostels");

            migrationBuilder.DropTable(
                name: "HostelCategories");

            migrationBuilder.DropIndex(
                name: "IX_Hostels_HostelCategoryId",
                table: "Hostels");

            migrationBuilder.DropColumn(
                name: "HostelCategoryId",
                table: "Hostels");

            migrationBuilder.AddColumn<int>(
                name: "PaymentDate",
                table: "Commitments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentDate",
                table: "Commitments");

            migrationBuilder.AddColumn<Guid>(
                name: "HostelCategoryId",
                table: "Hostels",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "HostelCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HostelCategories", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Hostels_HostelCategoryId",
                table: "Hostels",
                column: "HostelCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Hostels_HostelCategories_HostelCategoryId",
                table: "Hostels",
                column: "HostelCategoryId",
                principalTable: "HostelCategories",
                principalColumn: "Id");
        }
    }
}
