'use client'
import React, { useState, useEffect } from "react";
import Editor from "@/ui/editor";
import generatedLetter from "@/ui/editor/default-content copy";

export default function Page() {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      const data = await response.json();
      setContent(generatedLetter);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching content:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center sm:px-5 sm:pt-[calc(20vh)]">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Editor initialContent={content} />
      )}
    </div>
  );
}
