using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class AddQuantityFacility : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Facilities_Hostels_HostelId",
                table: "Facilities");

            migrationBuilder.AlterColumn<Guid>(
                name: "HostelId",
                table: "Facilities",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Facilities",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Facilities_Hostels_HostelId",
                table: "Facilities",
                column: "HostelId",
                principalTable: "Hostels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Facilities_Hostels_HostelId",
                table: "Facilities");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Facilities");

            migrationBuilder.AlterColumn<Guid>(
                name: "HostelId",
                table: "Facilities",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Facilities_Hostels_HostelId",
                table: "Facilities",
                column: "HostelId",
                principalTable: "Hostels",
                principalColumn: "Id");
        }
    }
}
