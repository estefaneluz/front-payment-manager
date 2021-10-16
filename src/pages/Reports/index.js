import ReportNavigation from "../../components/ReportNavigation";
import Table from '../../components/Table';
import { clientTitles } from '../Client';
import { chargesTitles } from '../Charges';

function Reports() {
    return(
        <div className="container">
            <ReportNavigation />
            {/* <Table>

            </Table> */}
        </div>
    );
}

export default Reports;