using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ZwcadVietnam.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddTagViewsPresetsVariants : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DataB",
                table: "Pages",
                type: "jsonb",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VariantBWeight",
                table: "Pages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Tag",
                table: "Contacts",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BlockPresets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Thumbnail = table.Column<string>(type: "text", nullable: true),
                    Data = table.Column<string>(type: "jsonb", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlockPresets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PageViews",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Slug = table.Column<string>(type: "text", nullable: false),
                    Variant = table.Column<string>(type: "text", nullable: true),
                    Referer = table.Column<string>(type: "text", nullable: true),
                    UserAgent = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PageViews", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PageViews_CreatedAt",
                table: "PageViews",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_PageViews_Slug",
                table: "PageViews",
                column: "Slug");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlockPresets");

            migrationBuilder.DropTable(
                name: "PageViews");

            migrationBuilder.DropColumn(
                name: "DataB",
                table: "Pages");

            migrationBuilder.DropColumn(
                name: "VariantBWeight",
                table: "Pages");

            migrationBuilder.DropColumn(
                name: "Tag",
                table: "Contacts");
        }
    }
}
