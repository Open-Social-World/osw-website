"use client"

import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation';

const AutoBreadcrumb = () => {
  const pathname = usePathname();
  
  // Split the pathname into segments and remove empty strings
  const segments = pathname.split('/').filter(segment => segment);
  
  // Generate the breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    // Build the href for this segment
    const href = '/' + segments.slice(0, index + 1).join('/');
    
    // Capitalize and clean the segment name
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Return breadcrumb item
    return {
      name,
      href,
      isLast: index === segments.length - 1
    };
  });

  // If we're at root path, just show Home
  if (breadcrumbItems.length === 0) {
    return (
      <Breadcrumb className="px-4 py-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb className="px-4 py-2">
      <BreadcrumbList>
        {/* Home link */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="hover:text-primary">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {/* Separator after Home */}
        <BreadcrumbSeparator />

        {/* Generated breadcrumb items */}
        {breadcrumbItems.map((item) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href} className="hover:text-primary">
                  {item.name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!item.isLast && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AutoBreadcrumb;