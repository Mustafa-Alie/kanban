import Header from "@/components/UI/Header";
import Workspace from "@/components/UI/Workspace";

export default function MainLayout() {
  return (
    <section className="flex grow flex-col">
      <Header />

      <Workspace />
    </section>
  );
}
