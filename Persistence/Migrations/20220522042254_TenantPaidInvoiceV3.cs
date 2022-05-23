using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class TenantPaidInvoiceV3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TenantPaidId",
                table: "Invoice",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_TenantPaidId",
                table: "Invoice",
                column: "TenantPaidId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_Users_TenantPaidId",
                table: "Invoice",
                column: "TenantPaidId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_Users_TenantPaidId",
                table: "Invoice");

            migrationBuilder.DropIndex(
                name: "IX_Invoice_TenantPaidId",
                table: "Invoice");

            migrationBuilder.DropColumn(
                name: "TenantPaidId",
                table: "Invoice");
        }
    }
}
