using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class FixTenantPaidInvoice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceEntities_InvoiceType_InvoiceTypeId",
                table: "InvoiceEntities");

            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceEntities_Users_TeanantPaidId",
                table: "InvoiceEntities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InvoiceEntities",
                table: "InvoiceEntities");

            migrationBuilder.RenameTable(
                name: "InvoiceEntities",
                newName: "Invoice");

            migrationBuilder.RenameIndex(
                name: "IX_InvoiceEntities_TeanantPaidId",
                table: "Invoice",
                newName: "IX_Invoice_TeanantPaidId");

            migrationBuilder.RenameIndex(
                name: "IX_InvoiceEntities_InvoiceTypeId",
                table: "Invoice",
                newName: "IX_Invoice_InvoiceTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Invoice",
                table: "Invoice",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_InvoiceType_InvoiceTypeId",
                table: "Invoice",
                column: "InvoiceTypeId",
                principalTable: "InvoiceType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_Users_TeanantPaidId",
                table: "Invoice",
                column: "TeanantPaidId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_InvoiceType_InvoiceTypeId",
                table: "Invoice");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_Users_TeanantPaidId",
                table: "Invoice");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Invoice",
                table: "Invoice");

            migrationBuilder.RenameTable(
                name: "Invoice",
                newName: "InvoiceEntities");

            migrationBuilder.RenameIndex(
                name: "IX_Invoice_TeanantPaidId",
                table: "InvoiceEntities",
                newName: "IX_InvoiceEntities_TeanantPaidId");

            migrationBuilder.RenameIndex(
                name: "IX_Invoice_InvoiceTypeId",
                table: "InvoiceEntities",
                newName: "IX_InvoiceEntities_InvoiceTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InvoiceEntities",
                table: "InvoiceEntities",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceEntities_InvoiceType_InvoiceTypeId",
                table: "InvoiceEntities",
                column: "InvoiceTypeId",
                principalTable: "InvoiceType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceEntities_Users_TeanantPaidId",
                table: "InvoiceEntities",
                column: "TeanantPaidId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
