using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class ManagerCreatingInvoice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ManagerId",
                table: "Invoice",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "RoomId",
                table: "Invoice",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_ManagerId",
                table: "Invoice",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_RoomId",
                table: "Invoice",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_Room_RoomId",
                table: "Invoice",
                column: "RoomId",
                principalTable: "Room",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_Users_ManagerId",
                table: "Invoice",
                column: "ManagerId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_Room_RoomId",
                table: "Invoice");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_Users_ManagerId",
                table: "Invoice");

            migrationBuilder.DropIndex(
                name: "IX_Invoice_ManagerId",
                table: "Invoice");

            migrationBuilder.DropIndex(
                name: "IX_Invoice_RoomId",
                table: "Invoice");

            migrationBuilder.DropColumn(
                name: "ManagerId",
                table: "Invoice");

            migrationBuilder.DropColumn(
                name: "RoomId",
                table: "Invoice");
        }
    }
}
