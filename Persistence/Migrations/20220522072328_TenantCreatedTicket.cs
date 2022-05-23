using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class TenantCreatedTicket : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "RoomId",
                table: "Tickets",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                table: "Tickets",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_RoomId",
                table: "Tickets",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_TenantId",
                table: "Tickets",
                column: "TenantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Room_RoomId",
                table: "Tickets",
                column: "RoomId",
                principalTable: "Room",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Users_TenantId",
                table: "Tickets",
                column: "TenantId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Room_RoomId",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Users_TenantId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_RoomId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_TenantId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "RoomId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "Tickets");
        }
    }
}
