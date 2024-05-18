"use client";
import Skeleton from "@/_components/shared/Skeleton";
import useDataStream from "@/_hooks/useDataStream";
import logger from "@/_lib/logger";
import React from "react";
import { AxisOptions, Chart, UserSerie } from "react-charts";

interface DataPoint {
  primary: Date;
  secondary: number;
  classification: string;
}

export default function SensorsChart() {
  const { data, isLoading } = useDataStream();

  const primaryAxis = React.useMemo<AxisOptions<DataPoint>>(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo<AxisOptions<DataPoint>[]>(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  const getSeriesStyle = React.useCallback(
    () => ({
      circle: {
        r: 5,
      },
    }),
    []
  );

  const getDatumStyle = React.useCallback(
    (datum: { classification: string }) => ({
      circle: {
        fill: datum.classification === "Normal" ? "green" : "green",
      },
    }),
    []
  );

  const chartData: UserSerie<DataPoint>[] = [
    {
      label: "Sensor Data",
      data: data || [],
    },
  ];

  return (
    <>
      {isLoading  ? (
        <Skeleton className="h-full w-full rounded-xl" />
      ) : (
        <Chart<DataPoint>
          options={{
            data: chartData,
            primaryAxis,
            secondaryAxes,
            getSeriesStyle: getSeriesStyle as any,
            getDatumStyle: getDatumStyle as any,
          }}
        />
      )}
    </>
  );
}
