using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class ChangeNameJoiningCodes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JoiningCode_Commitments_CommitementId",
                table: "JoiningCode");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JoiningCode",
                table: "JoiningCode");

            migrationBuilder.RenameTable(
                name: "JoiningCode",
                newName: "JoiningCodes");

            migrationBuilder.RenameIndex(
                name: "IX_JoiningCode_CommitementId",
                table: "JoiningCodes",
                newName: "IX_JoiningCodes_CommitementId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JoiningCodes",
                table: "JoiningCodes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_JoiningCodes_Commitments_CommitementId",
                table: "JoiningCodes",
                column: "CommitementId",
                principalTable: "Commitments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JoiningCodes_Commitments_CommitementId",
                table: "JoiningCodes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JoiningCodes",
                table: "JoiningCodes");

            migrationBuilder.RenameTable(
                name: "JoiningCodes",
                newName: "JoiningCode");

            migrationBuilder.RenameIndex(
                name: "IX_JoiningCodes_CommitementId",
                table: "JoiningCode",
                newName: "IX_JoiningCode_CommitementId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JoiningCode",
                table: "JoiningCode",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_JoiningCode_Commitments_CommitementId",
                table: "JoiningCode",
                column: "CommitementId",
                principalTable: "Commitments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
