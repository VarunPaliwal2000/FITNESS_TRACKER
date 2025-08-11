import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddWorkout from "../components/AddWorkout";
import CategoryChart from "../components/Cards/CategoryChart";
import CountsCard from "../components/Cards/CountsCard";
import WeeklyStatCard from "../components/Cards/WeeklyStatCard";
import { counts } from "../utils/data";
import {
  apiAddNewWorkout,
  getDashboardDetails,
  getWorkoutDetails,
} from "../api";
import WorkoutCard from "../components/Cards/WorkoutCard";

// Styled components
const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Dashboard = () => {
  const [data, setData] = useState();
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [workout, setWorkout] = useState(`#Legs
-Back Squat
-5 setsX15 reps
-30 kg
-10 min`);
  const [loading, setLoading] = useState(false);

  const dashboardData = async () => {
    try {
      const token = localStorage.getItem("fittrack-app-token");
      const res = await getDashboardDetails(token);
      setData(res?.data);
      console.log("Dashboard Data:", res);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  const getTodaysWorkout = async () => {
    try {
      const token = localStorage.getItem("fittrack-app-token");
      const res = await getWorkoutDetails(token, "");
      setTodaysWorkouts(res?.data?.todaysWorkouts || []);
      console.log("Today's Workouts:", res?.data);
    } catch (err) {
      console.error("Error fetching today's workouts:", err);
    }
  };

  const handleAddWorkout = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("fittrack-app-token");
      await apiAddNewWorkout(token, { workoutString: workout });
      // Refresh all widgets after add
      await dashboardData();
      await getTodaysWorkout();
    } catch (err) {
      alert(err?.response?.data?.error || err.message || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dashboardData();
    getTodaysWorkout();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>

        {/* Counts Cards */}
        <FlexWrap>
          {counts.map((item, idx) => (
            <CountsCard key={idx} item={item} data={data} />
          ))}
        </FlexWrap>

        {/* Charts & Add Workout */}
        <FlexWrap>
          <WeeklyStatCard data={data} />
          <CategoryChart data={data} />
          <AddWorkout
            workout={workout}
            setWorkout={setWorkout}
            addNewWorkout={handleAddWorkout}
            buttonLoading={loading}
          />
        </FlexWrap>

        {/* Today's Workouts */}
        <Section>
          <Title>Today's Workout</Title>
          <CardWrapper>
            {todaysWorkouts.map((workout, idx) => (
              <WorkoutCard key={idx} workout={workout} />
            ))}
          </CardWrapper>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
