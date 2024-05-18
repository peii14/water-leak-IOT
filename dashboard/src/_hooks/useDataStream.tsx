import api from "@/_lib/axios";
import { SensorsProps } from "@/_types/entity/sensors";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function useDataStream() {
  const fetcher = async () => {
    const response = await api.get("/sensors").then((res) => res.data.data);
    return response;
  };

  const { data, isLoading, error } = useQuery<SensorsProps[]>({
    queryKey: ["data"],
    refetchInterval: 1000,
    queryFn: fetcher,
  });

  const transformedData = React.useMemo(() => {
    return (
      data?.map((datum) => ({
        primary: new Date(datum.timestamp),
        secondary: Number(datum.x1003_24_SUM_OUT) * 1000,
        classification: datum.classification,
      })) || []
    );
  }, [data]);

  return { data: transformedData, isLoading, error };
}

export default useDataStream;
