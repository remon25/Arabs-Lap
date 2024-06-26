import Stat from "./Stat";
import {
  HiOutlineChartBar,
} from "react-icons/hi2";
import { ImLab } from "react-icons/im";
import { TbReportAnalytics } from "react-icons/tb";
import { FaUsersBetweenLines } from "react-icons/fa6";



export default function Stats({
  users,
  totalReports,
  labReports,
  operationReports,
}) {
  // 1.
  const numUsers = users?.length;

  // 3.
  const numOperationReports = operationReports?.length;

  // 4.

  const numLapReports = labReports?.length;

  return (
    <>
      <Stat
        title="المستخدمين"
        color="blue"
        icon={<FaUsersBetweenLines />}
        value={numUsers}
      />
      <Stat
        title="إجمالي التقارير"
        color="green"
        icon={<HiOutlineChartBar />}
        value={totalReports}
      />
      <Stat
        title="تقارير التشغيل"
        color="indigo"
        icon={<TbReportAnalytics />}
        value={numOperationReports}
      />
      <Stat
        title="تقارير المختبر"
        color="yellow"
        icon={<ImLab />}
        value={numLapReports}
      />
    </>
  );
}
