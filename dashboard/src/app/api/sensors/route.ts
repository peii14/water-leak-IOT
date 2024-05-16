import {
  internalServerErrorResponse,
  successResponse,
} from "@/_lib/apiHelpers";
import { MongoClient } from "mongodb";

export async function GET() {
  try {
    const uri = "mongodb://admin:admin@localhost:27017";

    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("water_treatment");

    const collection = db.collection("classification");
    const data = await collection.find().sort({ timestamp: 1 }).toArray();

    await client.close();
    const returnData = {
      data: data.map((item) => ({
        classification: item.classification,
        x1003_24_SUM_OUT: item.x1003_24_SUM_OUT,
        timestamp: item.timestamp,

        document: [
          {
            P1_FCV01D: item.P1_FCV01D,
            P1_FCV01Z: item.P1_FCV01Z,
            P1_FCV02D: item.P1_FCV02D,
            P1_FCV02Z: item.P1_FCV02Z,
            P1_FCV03D: item.P1_FCV03D,
            P1_FCV03Z: item.P1_FCV03Z,
            P1_FT01: item.P1_FT01,
            P1_FT01Z: item.P1_FT01Z,
            P1_FT02: item.P1_FT02,
            P1_FT02Z: item.P1_FT02Z,
            P1_FT03: item.P1_FT03,
            P1_FT03Z: item.P1_FT03Z,
            P1_LCV01D: item.P1_LCV01D,
            P1_LCV01Z: item.P1_LCV01Z,
            P1_LIT01: item.P1_LIT01,
            P1_PCV01D: item.P1_PCV01D,
            P1_PCV01Z: item.P1_PCV01Z,
            P1_PCV02D: item.P1_PCV02D,
            P1_PCV02Z: item.P1_PCV02Z,
            P1_PIT01: item.P1_PIT01,
            P1_PIT01_HH: item.P1_PIT01_HH,
            P1_PIT02: item.P1_PIT02,
            P1_PP01AD: item.P1_PP01AD,
            P1_PP01AR: item.P1_PP01AR,
            P1_PP01BD: item.P1_PP01BD,
            P1_PP01BR: item.P1_PP01BR,
            P1_PP02D: item.P1_PP02D,
            P1_PP02R: item.P1_PP02R,
            P1_PP04: item.P1_PP04,
            P1_PP04D: item.P1_PP04D,
            P1_PP04SP: item.P1_PP04SP,
            P1_SOL01D: item.P1_SOL01D,
            P1_SOL03D: item.P1_SOL03D,
            P1_STSP: item.P1_STSP,
            P1_TIT01: item.P1_TIT01,
            P1_TIT02: item.P1_TIT02,
            P1_TIT03: item.P1_TIT03,
            P2_24Vdc: item.P2_24Vdc,
            P2_ATSW_Lamp: item.P2_ATSW_Lamp,
            P2_AutoGO: item.P2_AutoGO,
            P2_AutoSD: item.P2_AutoSD,
            P2_Emerg: item.P2_Emerg,
            P2_MASW: item.P2_MASW,
            P2_MASW_Lamp: item.P2_MASW_Lamp,
            P2_ManualGO: item.P2_ManualGO,
            P2_ManualSD: item.P2_ManualSD,
            P2_OnOff: item.P2_OnOff,
            P2_RTR: item.P2_RTR,
            P2_SCO: item.P2_SCO,
            P2_SCST: item.P2_SCST,
            P2_SIT01: item.P2_SIT01,
            P2_TripEx: item.P2_TripEx,
            P2_VIBTR01: item.P2_VIBTR01,
            P2_VIBTR02: item.P2_VIBTR02,
            P2_VIBTR03: item.P2_VIBTR03,
            P2_VIBTR04: item.P2_VIBTR04,
            P2_VT01: item.P2_VT01,
            P2_VTR01: item.P2_VTR01,
            P2_VTR02: item.P2_VTR02,
            P2_VTR03: item.P2_VTR03,
            P2_VTR04: item.P2_VTR04,
            P3_FIT01: item.P3_FIT01,
            P3_LCP01D: item.P3_LCP01D,
            P3_LCV01D: item.P3_LCV01D,
            P3_LH01: item.P3_LH01,
            P3_LIT01: item.P3_LIT01,
            P3_LL01: item.P3_LL01,
            P3_PIT01: item.P3_PIT01,
            P4_HT_FD: item.P4_HT_FD,
            P4_HT_PO: item.P4_HT_PO,
            P4_HT_PS: item.P4_HT_PS,
            P4_LD: item.P4_LD,
            P4_ST_FD: item.P4_ST_FD,
            P4_ST_GOV: item.P4_ST_GOV,
            P4_ST_LD: item.P4_ST_LD,
            P4_ST_PO: item.P4_ST_PO,
            P4_ST_PS: item.P4_ST_PS,
            P4_ST_PT01: item.P4_ST_PT01,
            P4_ST_TT01: item.P4_ST_TT01,
            x1001_05_SETPOINT_OUT: item.x1001_05_SETPOINT_OUT,
            x1001_15_ASSIGN_OUT: item.x1001_15_ASSIGN_OUT,
            x1002_07_SETPOINT_OUT: item.x1002_07_SETPOINT_OUT,
            x1002_08_SETPOINT_OUT: item.x1002_08_SETPOINT_OUT,
            x1003_10_SETPOINT_OUT: item.x1003_10_SETPOINT_OUT,
            x1003_18_SETPOINT_OUT: item.x1003_18_SETPOINT_OUT,
            x1003_24_SUM_OUT: item.x1003_24_SUM_OUT,
          },
        ],
      })),
    };

    return successResponse(returnData.data);
  } catch (e) {
    return internalServerErrorResponse("kntl");
  }
}
