
import React, { useState } from "react";
import { InvestmentSchedule } from "@/types";
import { formatCurrency } from "@/lib/calculations";
import { ScrollArea } from "@/components/ui/scroll-area";
import BlurBackground from "./ui/BlurBackground";
import { useIsMobile } from "@/hooks/use-mobile";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface InvestmentTableProps {
  data: InvestmentSchedule[];
}

const InvestmentTable = ({ data }: InvestmentTableProps) => {
  const [showAll, setShowAll] = useState(false);
  const isMobile = useIsMobile();
  
  // Show limited entries or all based on state
  const displayData = showAll ? data : data.slice(0, 10);
  
  return (
    <BlurBackground className="p-4 md:p-6 animate-fade-in h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-medium text-gray-800">Investment Schedule</h2>
        {data.length > 10 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-portfolio-blue hover:text-portfolio-navy text-sm font-medium transition-colors"
          >
            {showAll ? "Show Less" : `Show All (${data.length})`}
          </button>
        )}
      </div>
      
      <ScrollArea className="h-[400px] rounded-md border">
        <div className="p-2 md:p-4">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className={isMobile ? "hidden md:table-cell" : ""}>Price</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className={isMobile ? "hidden md:table-cell" : ""}>Shares</TableHead>
                <TableHead>Total Shares</TableHead>
                <TableHead className={isMobile ? "hidden md:table-cell" : ""}>Total Invested</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.map((item, index) => (
                <TableRow 
                  key={index}
                  className={item.dividend > 0 ? "bg-green-50/50" : ""}
                >
                  <TableCell>
                    {item.date}
                    {item.dividend > 0 && (
                      <span className="ml-1 text-xs text-green-600">
                        (Dividend)
                      </span>
                    )}
                  </TableCell>
                  <TableCell className={isMobile ? "hidden md:table-cell" : ""}>{formatCurrency(item.price)}</TableCell>
                  <TableCell>
                    {formatCurrency(item.amount)}
                    {item.dividend > 0 && (
                      <span className="ml-1 text-xs text-green-600">
                        ({formatCurrency(item.dividend)}/share)
                      </span>
                    )}
                  </TableCell>
                  <TableCell className={isMobile ? "hidden md:table-cell" : ""}>{item.sharesPurchased.toFixed(4)}</TableCell>
                  <TableCell>{item.totalShares.toFixed(4)}</TableCell>
                  <TableCell className={isMobile ? "hidden md:table-cell" : ""}>{formatCurrency(item.totalInvested)}</TableCell>
                  <TableCell>{formatCurrency(item.currentValue)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </BlurBackground>
  );
};

export default InvestmentTable;
