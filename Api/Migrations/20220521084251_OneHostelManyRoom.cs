using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class OneHostelManyRoom : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Room_RoomType_RoomEntity_RoomId",
                table: "Room_RoomType");

            migrationBuilder.DropForeignKey(
                name: "FK_Room_RoomType_RoomType_TypeId",
                table: "Room_RoomType");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoomEntity",
                table: "RoomEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Room_RoomType",
                table: "Room_RoomType");

            migrationBuilder.RenameTable(
                name: "RoomEntity",
                newName: "Room");

            migrationBuilder.RenameTable(
                name: "Room_RoomType",
                newName: "RoomClassification");

            migrationBuilder.RenameIndex(
                name: "IX_Room_RoomType_TypeId",
                table: "RoomClassification",
                newName: "IX_RoomClassification_TypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Room_RoomType_RoomId",
                table: "RoomClassification",
                newName: "IX_RoomClassification_RoomId");

            migrationBuilder.AddColumn<Guid>(
                name: "HostelId",
                table: "Room",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Room",
                table: "Room",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoomClassification",
                table: "RoomClassification",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Room_HostelId",
                table: "Room",
                column: "HostelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Room_Hostel_HostelId",
                table: "Room",
                column: "HostelId",
                principalTable: "Hostel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoomClassification_Room_RoomId",
                table: "RoomClassification",
                column: "RoomId",
                principalTable: "Room",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoomClassification_RoomType_TypeId",
                table: "RoomClassification",
                column: "TypeId",
                principalTable: "RoomType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Room_Hostel_HostelId",
                table: "Room");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomClassification_Room_RoomId",
                table: "RoomClassification");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomClassification_RoomType_TypeId",
                table: "RoomClassification");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoomClassification",
                table: "RoomClassification");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Room",
                table: "Room");

            migrationBuilder.DropIndex(
                name: "IX_Room_HostelId",
                table: "Room");

            migrationBuilder.DropColumn(
                name: "HostelId",
                table: "Room");

            migrationBuilder.RenameTable(
                name: "RoomClassification",
                newName: "Room_RoomType");

            migrationBuilder.RenameTable(
                name: "Room",
                newName: "RoomEntity");

            migrationBuilder.RenameIndex(
                name: "IX_RoomClassification_TypeId",
                table: "Room_RoomType",
                newName: "IX_Room_RoomType_TypeId");

            migrationBuilder.RenameIndex(
                name: "IX_RoomClassification_RoomId",
                table: "Room_RoomType",
                newName: "IX_Room_RoomType_RoomId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Room_RoomType",
                table: "Room_RoomType",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoomEntity",
                table: "RoomEntity",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Room_RoomType_RoomEntity_RoomId",
                table: "Room_RoomType",
                column: "RoomId",
                principalTable: "RoomEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Room_RoomType_RoomType_TypeId",
                table: "Room_RoomType",
                column: "TypeId",
                principalTable: "RoomType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
