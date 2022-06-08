using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class add_facility_relation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Facilities_Rooms_RoomId",
                table: "Facilities");

            migrationBuilder.DropIndex(
                name: "IX_Facilities_RoomId",
                table: "Facilities");

            migrationBuilder.DropColumn(
                name: "RoomId",
                table: "Facilities");

            migrationBuilder.AddColumn<Guid>(
                name: "HostelId",
                table: "Facilities",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "RoomEntityId",
                table: "Facilities",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "FacilityManagements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    RoomId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    HostelId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FacilityManagements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FacilityManagements_Hostels_HostelId",
                        column: x => x.HostelId,
                        principalTable: "Hostels",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FacilityManagements_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Facilities_HostelId",
                table: "Facilities",
                column: "HostelId");

            migrationBuilder.CreateIndex(
                name: "IX_Facilities_RoomEntityId",
                table: "Facilities",
                column: "RoomEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_FacilityManagements_HostelId",
                table: "FacilityManagements",
                column: "HostelId");

            migrationBuilder.CreateIndex(
                name: "IX_FacilityManagements_RoomId",
                table: "FacilityManagements",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Facilities_Hostels_HostelId",
                table: "Facilities",
                column: "HostelId",
                principalTable: "Hostels",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Facilities_Rooms_RoomEntityId",
                table: "Facilities",
                column: "RoomEntityId",
                principalTable: "Rooms",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Facilities_Hostels_HostelId",
                table: "Facilities");

            migrationBuilder.DropForeignKey(
                name: "FK_Facilities_Rooms_RoomEntityId",
                table: "Facilities");

            migrationBuilder.DropTable(
                name: "FacilityManagements");

            migrationBuilder.DropIndex(
                name: "IX_Facilities_HostelId",
                table: "Facilities");

            migrationBuilder.DropIndex(
                name: "IX_Facilities_RoomEntityId",
                table: "Facilities");

            migrationBuilder.DropColumn(
                name: "HostelId",
                table: "Facilities");

            migrationBuilder.DropColumn(
                name: "RoomEntityId",
                table: "Facilities");

            migrationBuilder.AddColumn<Guid>(
                name: "RoomId",
                table: "Facilities",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Facilities_RoomId",
                table: "Facilities",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Facilities_Rooms_RoomId",
                table: "Facilities",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
