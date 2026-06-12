export interface SettlementLog {
  date: string;
  count: number;
  total: number;
  status: string;
}

export interface Metric {
  label: string;
  value: string;
  valueClassName: string;
  hint?: string;
  hintClassName?: string;
}

export interface PackageSegment {
  label: string;
  val: string;
  barWidth: string;
  color: string;
}

export interface DistributionLog {
  period: string;
  count: string;
  total: string;
  profit: string;
  status: string;
}

export interface HeaderProps {
  onExportCSV: () => void;
}
