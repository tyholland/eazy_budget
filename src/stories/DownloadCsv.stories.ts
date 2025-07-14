import DownloadCsv from "../components/DownloadCsv/DownloadCsv.tsx";

const DownloadCsvStory = {
  title: "Components/DownloadCsv",
  component: DownloadCsv,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Primary = {
  args: {
    type: "monthly",
  },
};

export default DownloadCsvStory;
