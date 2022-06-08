using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class RemoveRoomFromFacility : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Facilities_Rooms_RoomEntityId",
                table: "Facilities");

            migrationBuilder.DropIndex(
                name: "IX_Facilities_RoomEntityId",
                table: "Facilities");

            migrationBuilder.DropColumn(
                name: "RoomEntityId",
                table: "Facilities");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "RoomEntityId",
                table: "Facilities",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Facilities_RoomEntityId",
                table: "Facilities",
                column: "RoomEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Facilities_Rooms_RoomEntityId",
                table: "Facilities",
                column: "RoomEntityId",
                principalTable: "Rooms",
                principalColumn: "Id");
        }
    }
}
