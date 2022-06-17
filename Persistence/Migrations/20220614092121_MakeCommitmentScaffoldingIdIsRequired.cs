using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class MakeCommitmentScaffoldingIdIsRequired : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Commitments_CommitmentScaffoldings_CommitmentScaffoldingId",
                table: "Commitments");

            migrationBuilder.AlterColumn<Guid>(
                name: "CommitmentScaffoldingId",
                table: "Commitments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Commitments_CommitmentScaffoldings_CommitmentScaffoldingId",
                table: "Commitments",
                column: "CommitmentScaffoldingId",
                principalTable: "CommitmentScaffoldings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Commitments_CommitmentScaffoldings_CommitmentScaffoldingId",
                table: "Commitments");

            migrationBuilder.AlterColumn<Guid>(
                name: "CommitmentScaffoldingId",
                table: "Commitments",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Commitments_CommitmentScaffoldings_CommitmentScaffoldingId",
                table: "Commitments",
                column: "CommitmentScaffoldingId",
                principalTable: "CommitmentScaffoldings",
                principalColumn: "Id");
        }
    }
}
