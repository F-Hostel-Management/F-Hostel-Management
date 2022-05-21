using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class AddingOwnerForHostel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "OwnerId",
                table: "Hostel",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Hostel_OwnerId",
                table: "Hostel",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Hostel_Users_OwnerId",
                table: "Hostel",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hostel_Users_OwnerId",
                table: "Hostel");

            migrationBuilder.DropIndex(
                name: "IX_Hostel_OwnerId",
                table: "Hostel");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Hostel");
        }
    }
}
