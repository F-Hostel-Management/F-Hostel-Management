using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class TenantPaidInvoice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TeanantPaidId",
                table: "InvoiceEntities",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TenantPaidId",
                table: "InvoiceEntities",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceEntities_TeanantPaidId",
                table: "InvoiceEntities",
                column: "TeanantPaidId");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceEntities_Users_TeanantPaidId",
                table: "InvoiceEntities",
                column: "TeanantPaidId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceEntities_Users_TeanantPaidId",
                table: "InvoiceEntities");

            migrationBuilder.DropIndex(
                name: "IX_InvoiceEntities_TeanantPaidId",
                table: "InvoiceEntities");

            migrationBuilder.DropColumn(
                name: "TeanantPaidId",
                table: "InvoiceEntities");

            migrationBuilder.DropColumn(
                name: "TenantPaidId",
                table: "InvoiceEntities");
        }
    }
}
