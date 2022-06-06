using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class AddHostelToCommitment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "HostelId",
                table: "Commitments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Commitments_HostelId",
                table: "Commitments",
                column: "HostelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Commitments_Hostels_HostelId",
                table: "Commitments",
                column: "HostelId",
                principalTable: "Hostels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Commitments_Hostels_HostelId",
                table: "Commitments");

            migrationBuilder.DropIndex(
                name: "IX_Commitments_HostelId",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "HostelId",
                table: "Commitments");
        }
    }
}
