import CreateSheetForm from "@/components/sheet/new/forms/CreateSheetForm";
import RawDataForm from "@/components/sheet/new/forms/RawDataForm";
import FormSteps from "@/components/sheet/new/FormSteps";
import StationsLevels from "@/components/sheet/new/StationsLevels";
import NewSheetProvider from "@/contexts/NewSheetContext";
import Head from "next/head";

export default function NewSheet() {
	return (
		<>
			<Head>
				<title>New Sheet</title>
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
				/>
			</Head>
			<NewSheetProvider>
				<FormSteps>
					<RawDataForm />
					<StationsLevels />
					<CreateSheetForm />
				</FormSteps>
			</NewSheetProvider>
		</>
	);
}
