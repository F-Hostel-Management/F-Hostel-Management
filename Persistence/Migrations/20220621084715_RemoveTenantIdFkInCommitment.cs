using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class RemoveTenantIdFkInCommitment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Commitments_Users_TenantId",
                table: "Commitments");

            migrationBuilder.DropIndex(
                name: "IX_Commitments_TenantId",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "Commitments");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                table: "Commitments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Commitments_TenantId",
                table: "Commitments",
                column: "TenantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Commitments_Users_TenantId",
                table: "Commitments",
                column: "TenantId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
