import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

// Preview fallback data for development or testing
const PREVIEW_DATA = {
  monthlyReport: {
    userName: "Kushal",
    type: "monthly-report",
    data: {
      month: "June",
      stats: {
        totalIncome: 35000,
        totalExpenses: 19700,
        byCategory: {
          housing: 9000,
          groceries: 3000,
          transportation: 500,
          entertainment: 1000,
          bills: 1500,
          insurance: 2000,
          food: 1500,
          utilities: 1200,
        },
      },
      insights: [
        "Your housing expenses account for over 45% of your spending — consider budgeting for rent next month.",
        "Great job keeping your entertainment and food expenses under ₹2,500!",
        "You're 98.5% through your budget — time to slow down on spending.",
      ],
    },
  },
  budgetAlert: {
    userName: "Kushal",
    type: "budget-alert",
    data: {
      percentageUsed: 98.5,
      budgetAmount: 20000,
      totalExpenses: 19700,
    },
  },
};

export default function EmailTemplate(props) {
  let { userName, type, data } = props || {};

  if (!userName || !data || !type) {
    const fallback = PREVIEW_DATA[type] ?? PREVIEW_DATA.monthlyReport;
    userName = fallback.userName;
    data = fallback.data;
    type = fallback.type;
  }

  if (type === "monthly-report") {
    return (
      <Html>
        <Head />
        <Preview>Your Monthly Financial Report</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Monthly Financial Report</Heading>
            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.text}>
              Here’s your financial summary for {data?.month ?? "this month"}:
            </Text>

            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Total Income</Text>
                <Text style={styles.heading}>
                  ₹{(data?.stats?.totalIncome ?? 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Total Expenses</Text>
                <Text style={styles.heading}>
                  ₹{(data?.stats?.totalExpenses ?? 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Net</Text>
                <Text style={styles.heading}>
                  ₹{((data?.stats?.totalIncome ?? 0) - (data?.stats?.totalExpenses ?? 0)).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </Text>
              </div>
            </Section>

            {data?.stats?.byCategory && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>Expenses by Category</Heading>
                {Object.entries(data.stats.byCategory).map(([category, amount]) => (
                  <div key={category} style={styles.row}>
                    <Text style={styles.text}>{category}</Text>
                    <Text style={styles.text}>
                      ₹{(amount ?? 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </Text>
                  </div>
                ))}
              </Section>
            )}

            {data?.insights && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>Finalyze Insights</Heading>
                {data.insights.map((insight, index) => (
                  <Text key={index} style={styles.text}>• {insight}</Text>
                ))}
              </Section>
            )}

            <Text style={styles.footer}>
              Thank you for using Finalyze. Keep tracking your finances for better financial health!
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "budget-alert") {
    return (
      <Html>
        <Head />
        <Preview>Budget Alert</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Budget Alert</Heading>
            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.text}>
              You’ve used {(data?.percentageUsed ?? 0).toFixed(1)}% of your monthly budget.
            </Text>
            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Budget Amount</Text>
                <Text style={styles.heading}>
                  ₹{(data?.budgetAmount ?? 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Spent So Far</Text>
                <Text style={styles.heading}>
                  ₹{(data?.totalExpenses ?? 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Remaining</Text>
                <Text style={styles.heading}>
                  ₹{((data?.budgetAmount ?? 0) - (data?.totalExpenses ?? 0)).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </Text>
              </div>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }

  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.title}>Invalid Email Type</Heading>
          <Text style={styles.text}>No template found for: {type}</Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily: "-apple-system, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#1f2937",
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 0 20px",
  },
  heading: {
    color: "#1f2937",
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 16px",
  },
  text: {
    color: "#4b5563",
    fontSize: "16px",
    margin: "0 0 16px",
  },
  section: {
    marginTop: "32px",
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "5px",
    border: "1px solid #e5e7eb",
  },
  statsContainer: {
    margin: "32px 0",
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "5px",
  },
  stat: {
    marginBottom: "16px",
    padding: "12px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #e5e7eb",
  },
  footer: {
    color: "#6b7280",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "32px",
    paddingTop: "16px",
    borderTop: "1px solid #e5e7eb",
  },
};
