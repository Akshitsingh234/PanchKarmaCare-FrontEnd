import { Heart, Shield, Clock, Award } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Comprehensive Care",
    description:
      "Complete medical services from preventive care to specialized treatments, all under one roof.",
  },
  {
    icon: Shield,
    title: "Advanced Technology",
    description:
      "State-of-the-art medical equipment and cutting-edge diagnostic tools for accurate results.",
  },
  {
    icon: Clock,
    title: "24/7 Emergency",
    description:
      "Round-the-clock emergency services with immediate response and expert medical attention.",
  },
  {
    icon: Award,
    title: "Expert Specialists",
    description:
      "Board-certified physicians and specialists with years of experience in their respective fields.",
  },
];

const Features = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are committed to providing exceptional healthcare services with
            the highest standards of medical excellence and patient care.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center border rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white"
            >
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
