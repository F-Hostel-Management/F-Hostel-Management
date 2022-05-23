using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class TenantPaidInvoiceV2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_Users_TeanantPaidId",
                table: "Invoice");

            migrationBuilder.DropIndex(
                name: "IX_Invoice_TeanantPaidId",
                table: "Invoice");

            migrationBuilder.DropColumn(
                name: "TeanantPaidId",
                table: "Invoice");

            migrationBuilder.DropColumn(
                name: "TenantPaidId",
                table: "Invoice");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TeanantPaidId",
                table: "Invoice",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TenantPaidId",
                table: "Invoice",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_TeanantPaidId",
                table: "Invoice",
                column: "TeanantPaidId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_Users_TeanantPaidId",
                table: "Invoice",
                column: "TeanantPaidId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
