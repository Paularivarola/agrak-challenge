import { useEffect, useRef } from "react";

interface SEOHeadDataProps {
  title: string;
}

export const useSEOHeadData = ({ title }: SEOHeadDataProps) => {
  const prevTitle = useRef<string>(document.title);
  const metaDescriptionElement = document.querySelector(
    'meta[name="description"]'
  );
  const prevDescription = useRef<string>(
    metaDescriptionElement ? metaDescriptionElement.getAttribute("content") : ""
  );

  useEffect(() => {
    const previousTitle = prevTitle.current;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = prevDescription.current;

    if (title && title !== previousTitle) {
      const newTitle = `${title.charAt(0).toUpperCase()}${title.slice(1)}`;
      document.title = `${newTitle} | UserManagePro`;
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          `Manage your users effortlessly with UserManagePro. Our powerful user management app allows you to easily add, edit, and delete user profiles.`
        );
      }
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription) {
        metaDescription.setAttribute("content", previousDescription || "");
      }
    };
  }, [title]);
};
