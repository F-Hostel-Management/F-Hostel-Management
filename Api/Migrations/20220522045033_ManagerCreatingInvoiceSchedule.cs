using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class ManagerCreatingInvoiceSchedule : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ManagerId",
                table: "InvoiceSchedules",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "RoomId",
                table: "InvoiceSchedules",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceSchedules_ManagerId",
                table: "InvoiceSchedules",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceSchedules_RoomId",
                table: "InvoiceSchedules",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceSchedules_Room_RoomId",
                table: "InvoiceSchedules",
                column: "RoomId",
                principalTable: "Room",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceSchedules_Users_ManagerId",
                table: "InvoiceSchedules",
                column: "ManagerId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceSchedules_Room_RoomId",
                table: "InvoiceSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceSchedules_Users_ManagerId",
                table: "InvoiceSchedules");

            migrationBuilder.DropIndex(
                name: "IX_InvoiceSchedules_ManagerId",
                table: "InvoiceSchedules");

            migrationBuilder.DropIndex(
                name: "IX_InvoiceSchedules_RoomId",
                table: "InvoiceSchedules");

            migrationBuilder.DropColumn(
                name: "ManagerId",
                table: "InvoiceSchedules");

            migrationBuilder.DropColumn(
                name: "RoomId",
                table: "InvoiceSchedules");
        }
    }
}
