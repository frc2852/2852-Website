# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the public-facing website for FRC Team 2852 "High Voltage" from Denis Morris Catholic High School in St. Catharines, Ontario. The site is hosted on GitHub Pages at 2852.ca.

## Architecture

The website has two main components:

1. **Main Site** (root directory): Static HTML pages using Bootstrap 5
   - `index.html` - Homepage with team info
   - `history.html` - Team history timeline
   - `resources.html` - Team resources
   - `sponsors.html` - Sponsor information

2. **Programming Course** (`/site/`): MkDocs-generated documentation site for programming fundamentals
   - Pre-built static site (MkDocs Material theme)
   - Weekly lesson structure (week1-l1 through week13)
   - Accessed via "PROGRAMMING" nav link

## Key Files

- `assets/css/style.css` - Main stylesheet (brand color: #d42e12)
- `assets/css/timeline.css` - History page timeline styles
- `assets/img/` - Images including logo, favicon, team photos
- `CNAME` - GitHub Pages custom domain config (2852.ca)

## Development

This is a static site with no build process for the main pages. Simply edit HTML/CSS files directly.

The `/site/` directory contains pre-built MkDocs output. If the source markdown files exist elsewhere, rebuild with `mkdocs build`.

## Deployment

Push to `master` branch - GitHub Pages automatically deploys the site.
