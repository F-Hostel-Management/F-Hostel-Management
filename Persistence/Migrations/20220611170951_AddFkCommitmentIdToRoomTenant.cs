using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class AddFkCommitmentIdToRoomTenant : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CommitmentId",
                table: "RoomTenants",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_RoomTenants_CommitmentId",
                table: "RoomTenants",
                column: "CommitmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomTenants_Commitments_CommitmentId",
                table: "RoomTenants",
                column: "CommitmentId",
                principalTable: "Commitments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoomTenants_Commitments_CommitmentId",
                table: "RoomTenants");

            migrationBuilder.DropIndex(
                name: "IX_RoomTenants_CommitmentId",
                table: "RoomTenants");

            migrationBuilder.DropColumn(
                name: "CommitmentId",
                table: "RoomTenants");
        }
    }
}
