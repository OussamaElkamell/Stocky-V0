import { v4 as uuidv4 } from "uuid"
import type { Element, ElementType, ElementStyle } from "@/contexts/WebsiteBuilderContext"

export const getDefaultContentForType = (type: ElementType): string => {
  switch (type) {
    case "heading":
      return "Welcome to My Website"
    case "text":
      return "This is a text block. Click to edit the content and styling."
    case "button":
      return "Click Me"
    case "image":
      return "/abstract-geometric-shapes.png"
    case "container":
      return ""
    case "divider":
      return ""
    case "list":
      return "Item 1\nItem 2\nItem 3"
    case "video":
      return "https://www.youtube.com/embed/dQw4w9WgXcQ"
    case "form":
      return "Name\nEmail\nMessage"
    case "icon":
      return "star"
    default:
      return ""
  }
}

export const getDefaultStyleForType = (type: ElementType): ElementStyle => {
  const baseStyle: ElementStyle = {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.5",
    color: "#000000",
    backgroundColor: "transparent",
    padding: "16px",
    margin: "0px",
    borderWidth: "0px",
    borderRadius: "4px",
    borderColor: "#e2e8f0",
    textAlign: "left",
  }

  switch (type) {
    case "heading":
      return {
        ...baseStyle,
        fontSize: "32px",
        fontWeight: "700",
        marginBottom: "16px",
      }
    case "button":
      return {
        ...baseStyle,
        backgroundColor: "#3b82f6",
        color: "#ffffff",
        padding: "8px 16px",
        borderRadius: "4px",
        fontWeight: "500",
        textAlign: "center",
      }
    case "image":
      return {
        ...baseStyle,
        padding: "0px",
      }
    case "container":
      return {
        ...baseStyle,
        padding: "16px",
        backgroundColor: "#f8fafc",
        borderWidth: "1px",
        borderColor: "#e2e8f0",
        width: "100%",
      }
    case "divider":
      return {
        ...baseStyle,
        padding: "0px",
        margin: "16px 0",
        borderWidth: "0px",
        borderTopWidth: "1px",
        borderColor: "#e2e8f0",
      }
    case "list":
      return {
        ...baseStyle,
        padding: "0 0 0 24px",
      }
    case "video":
      return {
        ...baseStyle,
        padding: "0px",
        width: "100%",
      }
    case "form":
      return {
        ...baseStyle,
        padding: "16px",
        backgroundColor: "#f8fafc",
        borderWidth: "1px",
        borderColor: "#e2e8f0",
      }
    case "icon":
      return {
        ...baseStyle,
        padding: "8px",
        fontSize: "24px",
        textAlign: "center",
      }
    default:
      return baseStyle
  }
}

export const createNewElement = (type: ElementType, position?: { x: number; y: number }): Element => {
  return {
    id: uuidv4(),
    type,
    content: getDefaultContentForType(type),
    style: getDefaultStyleForType(type),
    position,
    children: type === "container" ? [] : undefined,
  }
}

export const findElementById = (elements: Element[], id: string): Element | null => {
  for (const element of elements) {
    if (element.id === id) {
      return element
    }
    if (element.children && element.children.length > 0) {
      const found = findElementById(element.children, id)
      if (found) {
        return found
      }
    }
  }
  return null
}

export const generateHtmlForElement = (element: Element): string => {
  const styleString = Object.entries(element.style || {})
    .map(([key, value]) => `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value};`)
    .join(" ")

  const linkWrapper = (content: string) => {
    if (element.linkUrl) {
      return `<a href="${element.linkUrl}" style="text-decoration: none; color: inherit;">${content}</a>`
    }
    return content
  }

  switch (element.type) {
    case "heading":
      return linkWrapper(`<h1 style="${styleString}">${element.content}</h1>`)
    case "text":
      return linkWrapper(`<p style="${styleString}">${element.content}</p>`)
    case "button":
      return linkWrapper(`<button style="${styleString}">${element.content}</button>`)
    case "image":
      return linkWrapper(`<img src="${element.content}" alt="Image" style="${styleString}" />`)
    case "container":
      const childrenHtml = element.children?.map(generateHtmlForElement).join("") || ""
      return `<div style="${styleString}">${childrenHtml}</div>`
    case "divider":
      return `<hr style="${styleString}" />`
    case "list":
      const listItems = element.content
        .split("\n")
        .map((item) => `<li>${item}</li>`)
        .join("")
      return `<ul style="${styleString}">${listItems}</ul>`
    case "video":
      return `<iframe src="${element.content}" style="${styleString}" frameborder="0" allowfullscreen></iframe>`
    case "form":
      const formFields = element.content
        .split("\n")
        .map(
          (field) =>
            `<div style="margin-bottom: 16px;"><label style="display: block; margin-bottom: 8px;">${field}</label><input type="text" style="width: 100%; padding: 8px; border: 1px solid #e2e8f0; border-radius: 4px;" /></div>`,
        )
        .join("")
      return `<form style="${styleString}">${formFields}<button type="submit" style="background-color: #3b82f6; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">Submit</button></form>`
    case "icon":
      // This is a simplified version - in a real app, you'd use an icon library
      return `<div style="${styleString}">⭐</div>`
    default:
      return ""
  }
}

export const generateHtmlForPage = (page: any, includeHead = true): string => {
  const elementsHtml = page.elements.map(generateHtmlForElement).join("")

  if (!includeHead) {
    return elementsHtml
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.settings.title}</title>
  <meta name="description" content="${page.settings.metaDescription}">
  ${page.settings.metaKeywords ? `<meta name="keywords" content="${page.settings.metaKeywords}">` : ""}
  ${page.settings.ogTitle ? `<meta property="og:title" content="${page.settings.ogTitle}">` : ""}
  ${page.settings.ogDescription ? `<meta property="og:description" content="${page.settings.ogDescription}">` : ""}
  ${page.settings.ogImage ? `<meta property="og:image" content="${page.settings.ogImage}">` : ""}
  ${page.settings.favicon ? `<link rel="icon" href="${page.settings.favicon}">` : ""}
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple  : ""}
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background-color: ${page.settings.backgroundColor || "#ffffff"};
    }
    * {
      box-sizing: border-box;
    }
  </style>
  ${page.settings.customCSS ? `<style>${page.settings.customCSS}</style>` : ""}
</head>
<body>
  <div class="website-content">
    ${elementsHtml}
  </div>
  ${page.settings.customJS ? `<script>${page.settings.customJS}</script>` : ""}
</body>
</html>
`
}

export const calculateSeoScore = (page: any): number => {
  let score = 0
  const maxScore = 100

  // Check title
  if (page.settings.title && page.settings.title.length > 0) {
    score += 10
    if (page.settings.title.length >= 10 && page.settings.title.length <= 60) {
      score += 5
    }
  }

  // Check meta description
  if (page.settings.metaDescription && page.settings.metaDescription.length > 0) {
    score += 10
    if (page.settings.metaDescription.length >= 50 && page.settings.metaDescription.length <= 160) {
      score += 5
    }
  }

  // Check for headings
  const hasHeadings = page.elements.some((element: any) => element.type === "heading")
  if (hasHeadings) {
    score += 10
  }

  // Check for images with alt text
  const hasImagesWithAlt = page.elements.some((element: any) => element.type === "image" && element.settings?.altText)
  if (hasImagesWithAlt) {
    score += 10
  }

  // Check for OG tags
  if (page.settings.ogTitle) score += 5
  if (page.settings.ogDescription) score += 5
  if (page.settings.ogImage) score += 5

  // Check for keywords
  if (page.settings.metaKeywords) score += 5

  // Check for favicon
  if (page.settings.favicon) score += 5

  // Check for mobile responsiveness
  score += 10

  // Check for SSL (assuming it's enabled)
  score += 5

  // Check for page speed (assuming it's good)
  score += 10

  return Math.min(score, maxScore)
}
